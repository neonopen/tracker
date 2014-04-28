
(function () {
    var e = void 0,
        g = !0,
        h = null,
        i = !1,
        j, l = this,
        aa = function (a) {
            var b = typeof a;
            if ("object" == b) if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        }, m = function (a) {
        return "array" == aa(a)
    }, ba = function (a) {
        var b = aa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, p = function (a) {
        return "string" == typeof a
    }, q = function (a) {
        return "number" == typeof a
    }, r = function (a) {
        return "function" == aa(a)
    };
    Math.floor(2147483648 * Math.random()).toString(36);
    var ca = function (a, b, c) {
        return a.call.apply(a.bind, arguments)
    }, da = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, ea = function (a, b, c) {
        ea = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ca : da;
        return ea.apply(h, arguments)
    }, u = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Bb = b.prototype;
        a.prototype = new c
    };
    var v = function () {
        return l.googletag || (l.googletag = {})
    }, w = function (a, b, c) {
        var d = v();
        if (!(a in d) || c) d[a] = b
    }, fa = function (a, b) {
        a.attachEvent ? a.attachEvent("onload", b) : a.addEventListener && a.addEventListener("load", b, i)
    };
    var y = function (a, b, c, d, f) {
        this.da = new Date;
        this.p = d || h;
        this.ca = c || h;
        this.Aa = a;
        this.Ba = b;
        this.ba = f || h
    };
    j = y.prototype;
    j.La = function () {
        return this.p
    };
    j.Ka = function () {
        return this.ca
    };
    j.Ja = function () {
        return this.Aa
    };
    j.Fa = function () {
        return this.da
    };
    j.jb = function () {
        return this.Ba
    };
    j.lb = function () {
        return this.ba
    };
    var ga = ["Debug", "Info", "Warning", "Error", "Fatal"];
    y.prototype.toString = function () {
        var a = this.da.toTimeString() + ": " + ga[this.Aa] + ": " + this.Ba;
        this.ba && (a += " Duration: " + (this.da.getTime() - this.ba.Fa().getTime()) + "ms.");
        return a
    };
    y.prototype.getTimestamp = y.prototype.Fa;
    y.prototype.getService = y.prototype.Ka;
    y.prototype.getSlot = y.prototype.La;
    y.prototype.getLevel = y.prototype.Ja;
    y.prototype.getMessage = y.prototype.jb;
    y.prototype.getReference = y.prototype.lb;
    var A = function () {
        this.F = []
    };
    A.prototype.bb = function () {
        return this.F
    };
    A.prototype.gb = function (a) {
        return ha(this, function (b) {
            return b.Ka() === a
        })
    };
    A.prototype.hb = function (a) {
        return ha(this, function (b) {
            return b.La() === a
        })
    };
    A.prototype.fb = function (a) {
        return ha(this, function (b) {
            return b.Ja() >= a
        })
    };
    var ha = function (a, b) {
        for (var c = [], d = 0; d < a.F.length; ++d) b(a.F[d]) && c.push(a.F[d]);
        return c
    };
    A.prototype.log = function (a, b, c, d, f) {
        a = new y(a, b, c, d, f);
        this.F.push(a);
        return a
    };
    A.prototype.info = function (a, b, c, d) {
        return this.log(1, a, b, c, d)
    };
    var C = function (a, b, c, d) {
        a.log(2, b, c, d, e)
    };
    A.prototype.error = function (a, b, c, d) {
        return this.log(3, a, b, c, d)
    };
    var D = function () {
        var a = v();
        return a.debug_log || (a.debug_log = new A)
    };
    w("getEventLog", D);
    A.prototype.getAllEvents = A.prototype.bb;
    A.prototype.getEventsByService = A.prototype.gb;
    A.prototype.getEventsBySlot = A.prototype.hb;
    A.prototype.getEventsByLevel = A.prototype.fb;
    var E = function () {
        this.Ga = this.ia = 0
    };
    E.prototype.push = function (a) {
        for (var b = D(), c = 0; c < arguments.length; ++c) try {
            r(arguments[c]) && (arguments[c](), this.ia++)
        } catch (d) {
            this.Ga++, b.error("Exception invoking function: " + d.message)
        }
        b.info("Invoked queued function. Total: " + this.ia + " Errors: " + this.Ga);
        return this.ia
    };
    E.prototype.push = E.prototype.push;
    var ia = function (a) {
        this.t = {};
        this.tick = function (a, c, d) {
            this.t[a] = [d != e ? d : (new Date).getTime(), c]
        };
        this.tick("start", h, a)
    }, ja = new ia;
    window.GPT_jstiming = {
        Timer: ia,
        load: ja
    };
    if (window.performance && window.performance.timing) {
        var ka = window.performance.timing,
            F = window.GPT_jstiming.load,
            G = ka.navigationStart,
            la = ka.responseStart;
        0 < G && la >= G && (F.tick("_wtsrt", e, G), F.tick("wtsrt_", "_wtsrt", la), F.tick("tbsd_", "wtsrt_"))
    }
    try {
        var H = h;
        window.chrome && window.chrome.csi && (H = Math.floor(window.chrome.csi().pageT), F && 0 < G && (F.tick("_tbnd", e, window.chrome.csi().startE), F.tick("tbnd_", "_tbnd", G)));
        H == h && window.gtbExternal && (H = window.gtbExternal.pageT());
        H == h && window.external && (H = window.external.pageT, F && 0 < G && (F.tick("_tbnd", e, window.external.startE), F.tick("tbnd_", "_tbnd", G)));
        H && (window.GPT_jstiming.pt = H)
    } catch (ma) {};
    if (window.GPT_jstiming) {
        window.GPT_jstiming.Ia = {};
        window.GPT_jstiming.Sa = 1;
        var na = function (a, b, c) {
            var d = a.t[b],
                f = a.t.start;
            if (d && (f || c)) return d = a.t[b][0], c != e ? f = c : f = f[0], d - f
        }, oa = function (a, b, c) {
            var d = "";
            window.GPT_jstiming.pt && (d += "&srt=" + window.GPT_jstiming.pt, delete window.GPT_jstiming.pt);
            try {
                window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
            } catch (f) {}
            var k = window.chrome;
            if (k && (k = k.loadTimes)) {
                k().wasFetchedViaSpdy && (d += "&p=s");
                if (k().wasNpnNegotiated) {
                    var d = d + "&npn=1",
                        n = k().npnNegotiatedProtocol;
                    n && (d += "&npnv=" + (encodeURIComponent || escape)(n))
                }
                k().wasAlternateProtocolAvailable && (d += "&apa=1")
            }
            var x = a.t,
                z = x.start,
                k = [],
                n = [],
                s;
            for (s in x) if ("start" != s && 0 != s.indexOf("_")) {
                var t = x[s][1];
                t ? x[t] && n.push(s + "." + na(a, s, x[t][0])) : z && k.push(s + "." + na(a, s))
            }
            delete x.start;
            if (b) for (var B in b) d += "&" + B + "=" + b[B];
            (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
            a = [b, "?v=3", "&s=" + (window.GPT_jstiming.sn || "gpt") + "&action=", a.name, n.length ? "&it=" + n.join(",") : "", "", d, "&rt=", k.join(",")].join("");
            if (!a) return "";
            var d = new Image,
                za = window.GPT_jstiming.Sa++;
            window.GPT_jstiming.Ia[za] = d;
            d.onload = d.onerror = function () {
                window.GPT_jstiming && delete window.GPT_jstiming.Ia[za]
            };
            d.src = a;
            d = h;
            return a
        };
        window.GPT_jstiming.report = function (a, b, c) {
            if ("prerender" == document.webkitVisibilityState) {
                var d = i,
                    f = function () {
                        if (!d) {
                            b ? b.prerender = "1" : b = {
                                prerender: "1"
                            };
                            var k;
                            "prerender" == document.webkitVisibilityState ? k = i : (oa(a, b, c), k = g);
                            k && (d = g, document.removeEventListener("webkitvisibilitychange", f, i))
                        }
                    };
                document.addEventListener("webkitvisibilitychange", f, i);
                return ""
            }
            return oa(a, b, c)
        }
    };
    var I, pa, J, qa, ra = function () {
        return l.navigator ? l.navigator.userAgent : h
    };
    qa = J = pa = I = i;
    var K;
    if (K = ra()) {
        var sa = l.navigator;
        I = 0 == K.indexOf("Opera");
        pa = !I && -1 != K.indexOf("MSIE");
        J = !I && -1 != K.indexOf("WebKit");
        qa = !I && !J && "Gecko" == sa.product
    }
    var ta = I,
        L = pa,
        ua = qa,
        va = J,
        wa;
    a: {
        var xa = "",
            M;
        if (ta && l.opera) var ya = l.opera.version,
            xa = "function" == typeof ya ? ya() : ya;
        else if (ua ? M = /rv\:([^\);]+)(\)|;)/ : L ? M = /MSIE\s+([^\);]+)(\)|;)/ : va && (M = /WebKit\/(\S+)/), M) var Aa = M.exec(ra()),
            xa = Aa ? Aa[1] : "";
        if (L) {
            var Ba, Ca = l.document;
            Ba = Ca ? Ca.documentMode : e;
            if (Ba > parseFloat(xa)) {
                wa = String(Ba);
                break a
            }
        }
        wa = xa
    }
    var Da = wa,
        Ea = {}, Fa = function (a) {
        if (!Ea[a]) {
            for (var b = 0, c = String(Da).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, d.length), k = 0; 0 == b && k < f; k++) {
                var n = c[k] || "",
                    x = d[k] || "",
                    z = RegExp("(\\d*)(\\D*)", "g"),
                    s = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var t = z.exec(n) || ["", "", ""],
                        B = s.exec(x) || ["", "", ""];
                    if (0 == t[0].length && 0 == B[0].length) break;
                    b = ((0 == t[1].length ? 0 : parseInt(t[1], 10)) < (0 == B[1].length ? 0 : parseInt(B[1], 10)) ? -1 : (0 == t[1].length ? 0 : parseInt(t[1], 10)) > (0 == B[1].length ? 0 : parseInt(B[1], 10)) ? 1 : 0) || ((0 == t[2].length) < (0 == B[2].length) ? -1 : (0 == t[2].length) > (0 == B[2].length) ? 1 : 0) || (t[2] < B[2] ? -1 : t[2] > B[2] ? 1 : 0)
                } while (0 == b)
            }
            Ea[a] = 0 <= b
        }
    }, Ga = {}, Ha = function () {
        return Ga[9] || (Ga[9] = L && !! document.documentMode && 9 <= document.documentMode)
    };
    !L || Ha();
    !ua && !L || L && Ha() || ua && Fa("1.9.1");
    L && Fa("9");
    var N = function (a, b) {
        this.Ua = a;
        this.Ta = b
    };
    N.prototype.qb = function () {
        return this.Ua
    };
    N.prototype.ib = function () {
        return this.Ta
    };
    N.prototype.getWidth = N.prototype.qb;
    N.prototype.getHeight = N.prototype.ib;
    var O = function (a, b, c) {
        this.w = a;
        this.Ca = q(b) ? b : 0;
        this.g = this.w + "_" + this.Ca;
        this.Ra = c || "gpt_unit_" + this.g
    };
    j = O.prototype;
    j.o = function () {
        return this.g
    };
    j.getName = function () {
        return this.w
    };
    j.Ea = function () {
        return this.Ca
    };
    j.toString = O.prototype.o;
    j.k = function () {
        return this.Ra
    };
    O.prototype.getId = O.prototype.o;
    O.prototype.getName = O.prototype.getName;
    O.prototype.getDomId = O.prototype.k;
    O.prototype.getInstance = O.prototype.Ea;
    var Ia = function (a) {
        return a.replace(/[^a-zA-Z0-9]/g, function (a) {
            return "&#" + a.charCodeAt() + ";"
        })
    }, Ja = function () {
        var a = document,
            b = h;
        try {
            b = a.location.protocol
        } catch (c) {}
        return "https:" == b ? "https:" : "http:"
    };
    var P = function (a, b, c, d) {
        this.w = a;
        var f = [];
        if (m(c)) if (1 < c.length && q(c[0]) && q(c[1])) f.push(new N(c[0], c[1]));
        else for (var k = 0; k < c.length; ++k) {
                var n = c[k];
                m(n) && (1 < n.length && q(n[0]) && q(n[1])) && f.push(new N(n[0], n[1]))
            }
        this.Na = f;
        this.g = new O(a, b, d);
        this.c = [];
        this.h = {};
        this.m = h;
        this.b = D();
        this.b.info("Created slot: " + this.g, h, this);
        this.u = this.J = h;
        this.pa = this.oa = "";
        this.P = g;
        this.d = {};
        this.qa = i
    };
    j = P.prototype;
    j.set = function (a, b) {
        var c = [" attribute ", a, " with value ", b, " for slot ", this.getName()].join("");
        a && p(a) && b ? (this.h[a] = b, this.J || this.u ? C(this.b, "Setting" + c + " after its contents have been loaded", h, this) : this.b.info("Setting" + c, h, this)) : C(this.b, "Unable to set" + c, h, this);
        return this
    };
    j.get = function (a) {
        return a in this.h ? this.h[a] : h
    };
    j.A = function () {
        var a = [],
            b;
        for (b in this.h) r(this.h[b]) || a.push(b);
        return a
    };
    j.aa = function (a) {
        for (var b = 0; b < this.c.length; ++b) if (a == this.c[b]) return C(this.b, "Service " + a.getName() + " is already associated with slot " + this.g, a, this), this;
        this.c.push(a);
        a.Y(this);
        return this
    };
    j.getName = function () {
        return this.w
    };
    j.i = function () {
        return this.g
    };
    j.mb = function () {
        return this.c
    };
    j.nb = function () {
        return this.Na
    };
    j.z = function () {
        return !!document.getElementById(this.g.k())
    };
    j.O = function (a) {
        this.m = a
    };
    j.D = function (a) {
        this.pa = a;
        return this
    };
    j.U = function () {
        return this.pa
    };
    j.r = function (a, b) {
        var c = [];
        m(b) ? c = b : b && c.push(b.toString());
        var d = [" targeting attribute ", a, " with value ", c.join(), " for slot ", this.getName()].join("");
        if (a && p(a)) {
            this.b.info("Setting" + d, h, this);
            a: {
                var d = this.d[a],
                    f = c;
                if (!ba(d) || !ba(f) || d.length != f.length) d = i;
                else {
                    for (var k = d.length, n = 0; n < k; n++) if (d[n] !== f[n]) {
                        d = i;
                        break a
                    }
                    d = g
                }
            }
            this.d[a] = c;
            if (!d && (this.J || this.u)) for (d = 0; d < this.c.length; ++d) f = this.c[d], f.isEnabled() && f.ra(this, a, c)
        } else C(this.b, "Unable to set" + d, h, this);
        return this
    };
    j.Va = function () {
        this.b.info("Clearing slot targeting.", h, this);
        var a;
        a: {
            for (a in this.d) {
                a = i;
                break a
            }
            a = g
        }
        this.d = {};
        if (!a) for (a = 0; a < this.c.length; ++a) {
            var b = this.c[a];
            b.isEnabled() && b.clearSlotTargeting(this)
        }
        return this
    };
    j.ob = function () {
        var a = this.d,
            b = {}, c;
        for (c in a) b[c] = a[c];
        return b
    };
    j.kb = function () {
        return this.qa
    };
    var Ka = function (a) {
        if (!a.z()) return a.b.error("Unable to write to slot " + a.g + ". It has not yet been rendered.", h, a), i;
        var b = l.document,
            c = a.g.k(),
            b = b && b.getElementById(c);
        if (!b) return a.b.error("Unable to find the div container with id " + c + " for slot " + a.g, h, a), i;
        c = a.m;
        return p(c) && 0 < c.length ? (a.va(), b.innerHTML = c, a.ua(), g) : i
    };
    j = P.prototype;
    j.ab = function (a) {
        this.J = this.b.info("Fetching ad for slot " + this.getName(), h, this);
        this.oa = a
    };
    j.cb = function () {
        return this.oa
    };
    j.$a = function () {
        this.b.info("Receiving ad for slot " + this.getName(), h, this, this.J)
    };
    j.va = function () {
        this.u = this.b.info("Rendering ad for slot " + this.getName(), h, this)
    };
    j.ua = function () {
        this.b.info("Completed rendering ad for slot " + this.getName(), h, this, this.u)
    };
    P.prototype.set = P.prototype.set;
    P.prototype.get = P.prototype.get;
    P.prototype.getName = P.prototype.getName;
    P.prototype.getSlotId = P.prototype.i;
    P.prototype.getSizes = P.prototype.nb;
    P.prototype.addService = P.prototype.aa;
    P.prototype.getOutOfPage = P.prototype.kb;
    P.prototype.getServices = P.prototype.mb;
    P.prototype.getAttributeKeys = P.prototype.A;
    P.prototype.fetchStarted = P.prototype.ab;
    P.prototype.fetchEnded = P.prototype.$a;
    P.prototype.renderStarted = P.prototype.va;
    P.prototype.renderEnded = P.prototype.ua;
    P.prototype.hasWrapperDiv = P.prototype.z;
    P.prototype.getContentUrl = P.prototype.cb;
    P.prototype.setClickUrl = P.prototype.D;
    P.prototype.getClickUrl = P.prototype.U;
    P.prototype.clearTargeting = P.prototype.Va;
    P.prototype.getTargetingMap = P.prototype.ob;
    P.prototype.setTargeting = P.prototype.r;
    var Q = function () {
        this.C = {};
        this.K = {};
        this.b = D()
    };
    Q.prototype.add = function (a, b, c) {
        if (!p(a) || 0 >= a.length || !b) return h;
        a in this.C || (this.C[a] = []);
        b = new P(a, this.C[a].length, b, c);
        c = b.i().k();
        if (this.K[c]) return this.b.error("Div element " + c + " is already associated with another slot"), h;
        this.C[a].push(b);
        return this.K[b.i().k()] = b
    };
    Q.prototype.find = function (a, b) {
        var c = b || 0,
            d = p(a) && this.C[a] || [];
        return 0 <= c && c < d.length && (d = d[c], d.i().Ea() == c) ? d : h
    };
    var La = function () {
        var a = v();
        return a.slot_manager_instance || (a.slot_manager_instance = new Q)
    }, Ma = function (a, b, c) {
        var d = La();
        return d && d.add(a, b, c)
    };
    w("defineOutOfPageSlot", function (a, b) {
        var c = La();
        return !c ? h : (c = c.add(a, [1, 1], b)) ? (c.qa = g, c) : h
    });
    w("defineSlot", Ma);
    w("defineUnit", Ma);
    Q.prototype.find = Q.prototype.find;
    Q.getInstance = La;
    var Na = function (a) {
        var b = D();
        if (p(a)) {
            var c;
            c = La();
            c.K[a] ? c = c.K[a] : (C(c.b, "Ad unit lookup for div " + a + " failed."), c = h);
            if (c) if (a = c, a.P && !a.z()) C(a.b, "Slot " + a.w + " does not have a container div with id: " + a.g.k() + ".", h, a);
            else for (b = 0; b < a.c.length; ++b) a.c[b].isEnabled() && a.c[b].G(a);
            else b.error("Div " + a + " is not mapped to a known ad unit.")
        } else b.error("Unknown div id in display(): " + a.toString())
    };
    w("display", Na, g);
    var R = function () {
        this.ya = [];
        this.za = {};
        this.ea = i;
        this.h = {};
        this.log = D();
        this.log.info("Created service: " + this.getName(), this)
    };
    j = R.prototype;
    j.getName = function () {
        return "unknown"
    };
    j.set = function (a, b) {
        var c = ["attribute ", a, " with value ", b, " for service ", this.getName()].join("");
        p(a) && 0 < a.length ? (this.h[a] = b, this.log.info("Setting " + c, this, h)) : C(this.log, "Unable to set " + c, this, h);
        return this
    };
    j.get = function (a) {
        return this.h[a]
    };
    j.A = function () {
        var a = [],
            b;
        for (b in this.h) "function" != typeof this.h[b] && a.push(b);
        return a
    };
    j.l = function () {
        return this.ya
    };
    j.Ha = function () {
        return this.za
    };
    j.isEnabled = function () {
        return this.ea
    };
    j.enable = function () {
        if (this.ea) this.log.info("Service is already enabled.", this);
        else {
            this.ea = g;
            try {
                this.ha()
            } catch (a) {
                this.log.error("Failed to enable service: " + a, this)
            }
        }
    };
    j.display = function (a, b, c, d) {
        this.enable();
        a = c ? Ma(a, b, c) : Ma(a, b);
        a.aa(this);
        d && a.D(d);
        Na(a.i().k())
    };
    j.Y = function (a) {
        this.ya.push(a);
        this.za[a.i().o()] = a;
        this.log.info("Associated " + this.getName() + " service with slot " + a.getName(), this, a)
    };
    j.clearSlotTargeting = function () {};
    j.ra = function () {};
    R.prototype.getSlots = R.prototype.l;
    R.prototype.getSlotIdMap = R.prototype.Ha;
    R.prototype.enable = R.prototype.enable;
    R.prototype.set = R.prototype.set;
    R.prototype.get = R.prototype.get;
    R.prototype.getAttributeKeys = R.prototype.A;
    R.prototype.display = R.prototype.display;
    var Oa = function (a, b) {
        this.name = a;
        this.ga = b ? b : new l.GPT_jstiming.Timer;
        this.ga.name = a;
        this.fa = []
    };
    j = Oa.prototype;
    j.getName = function () {
        return this.name
    };
    j.tick = function (a, b) {
        this.ga.tick(a, b)
    };
    j.Da = function (a) {
        a && this.fa.push(a)
    };
    j.report = function () {
        var a = "https:" == l.location.protocol ? "https://www.google.com/csi" : "http://csi.gstatic.com/csi",
            b = {};
        this.fa.length && (b.e = this.fa.join());
        return l.GPT_jstiming.report(this.ga, b, a)
    };
    j.Ma = function (a) {
        fa(window, function () {
            setTimeout(a, 10)
        })
    };
    var S = function (a) {
        this.name = a
    };
    u(S, Oa);
    S.prototype.tick = function () {};
    S.prototype.Da = function () {};
    S.prototype.report = function () {
        return h
    };
    S.prototype.Ma = function () {};
    if (!v()._gpt_timer_ && l.GPT_jstiming) {
        var T, Pa = l.GPT_jstiming.load,
            Qa = 0.01;
        Qa == e && (Qa = 0.01);
        T = l.GPT_jstiming && l.GPT_jstiming.load && ("http:" == l.location.protocol || "https:" == l.location.protocol) && Math.random() < Qa ? new Oa("global", Pa) : new S("global");
        T.Ma(function () {
            T.tick("load");
            T.report()
        });
        w("_gpt_timer_", T)
    }
    v();
    var U = function () {
        this.c = {};
        this.R = i;
        this.b = D();
        this.Pa = this.b.info("Google service JS loaded");
        fa(window, ea(U.prototype.Qa, this))
    };
    U.prototype.add = function (a) {
        this.c[a.getName()] = a
    };
    U.prototype.find = function (a) {
        var b = h;
        a in this.c && (b = this.c[a]);
        return b
    };
    U.prototype.Qa = function () {
        this.R = g;
        this.b.info("Page load complete", h, h, this.Pa)
    };
    var V = function () {
        var a = v();
        return a.service_manager_instance || (a.service_manager_instance = new U)
    };
    w("enableServices", function () {
        var a = V(),
            b;
        for (b in a.c) {
            var c = a.c[b];
            if (!r(c)) {
                c.enable();
                var c = b,
                    d = v()._gpt_timer_;
                d && d.Da(c)
            }
        }
    });
    var W = function () {
        R.call(this);
        this.sa = g;
        this.$ = i;
        this.M = 0;
        this.N = "";
        this.X = this.W = this.V = this.B = e;
        this.ta = this.Z = i;
        this.T = {};
        this.L = i
    };
    u(W, R);
    j = W.prototype;
    j.ha = function () {
        if (this.sa) {
            if (!this.ta) {
                var a = document,
                    b = document.createElement("script");
                b.async = g;
                b.type = "text/javascript";
                b.src = this.n();
                try {
                    var c = a.getElementsByTagName("script")[0];
                    this.log.info("Fetching companion ads implementation", this);
                    this.ta = g;
                    c.parentNode && c.parentNode.insertBefore(b, c)
                } catch (d) {
                    this.log.error("Unable to fetch companion ads implementation", this)
                }
            }
        } else this.Z || (l.document.write('<script type="text/javascript" src="' + Ia(this.n()) + '"><\/script>'), this.Z = g)
    };
    j.Xa = function () {
        this.sa = i
    };
    j.wb = function (a) {
        "boolean" == typeof a && (this.$ = a)
    };
    j.sb = function (a) {
        if (this.$) {
            for (var b = this.Ha(), c = [], d = 0; d < a.length; ++d) {
                var f = a[d];
                f in b ? c.push(b[f]) : C(this.log, "Cannot find slot with id " + f + ".", this)
            }
            Ra(this, c)
        }
    };
    j.wa = function () {
        var a = googletag.pubads();
        if (!a.isEnabled()) return i;
        var a = a.l(),
            b = this.l();
        if (a.length != b.length) return i;
        for (var c = 0; c < b.length; ++c) {
            for (var d = i, f = 0; f < a.length; ++f) if (b[c] === a[f]) {
                d = g;
                break
            }
            if (!d) return i
        }
        return g
    };
    j.vb = function () {
        this.$ && Ra(this, h)
    };
    j.yb = function (a, b, c, d, f, k, n) {
        this.L = i;
        this.M = 0;
        this.N = "";
        this.X = this.W = this.V = this.B = e;
        this.M = a;
        this.N = b;
        this.B = c;
        0 == this.B.length && (this.B = e);
        a: {
            a = d.split(",");
            b = [];
            for (c = 0; c < a.length; ++c) {
                d = a[c].split("x");
                if (2 != d.length) {
                    this.log.error("The master ad size specified is invalid.");
                    a = e;
                    break a
                }
                d = [Number(d[0]), Number(d[1])];
                if (isNaN(d[0]) || isNaN(d[1])) {
                    this.log.error("The master ad size specified is invalid.");
                    a = e;
                    break a
                }
                b.push(d)
            }
            a = b
        }
        this.V = a;
        f !== e && (this.W = f);
        k !== e && (this.X = k);
        n !== e && (this.L = n)
    };
    j.eb = function () {
        return googletag.pubads().getCorrelator()
    };
    j.getVideoStreamCorrelator = function () {
        return googletag.pubads().getVideoStreamCorrelator()
    };
    j.zb = function (a) {
        this.M = a
    };
    j.Ab = function (a) {
        this.N = a
    };
    var Ra = function (a, b) {
        var c = googletag.pubads();
        if (c.isEnabled()) {
            if (a.L) {
                if (!a.wa()) {
                    C(a.log, "Persistent roadblock requested, but ad slots are incorrectly configured. All ad slots on page must have both pubads and companionAds services attached. Skipping refresh.");
                    return
                }
                c.clearNoRefreshState();
                c.clear()
            }
            c.xa(b, a.M, a.N, a.B, a.V, a.W, a.X, a.L)
        } else a.log.error("Pubads service is not enabled, cannot use refresh feature.")
    };
    j = W.prototype;
    j.isSlotAPersistentRoadblock = function (a) {
        var b = googletag.pubads();
        if (b.isEnabled()) return b.isSlotAPersistentRoadblock(a);
        this.log.error("Pubads service is not enabled, cannot check whether slot is a persistent roadblock.  Content writing allowed.");
        return i
    };
    j.getName = function () {
        return "companion_ads"
    };
    j.n = function () {
        return Ja() + "//pagead2.googlesyndication.com/pagead/show_companion_ad.js"
    };
    j.ub = function () {
        this.log.info("Companion ads implementation fetched.", this);
        this.Z = g
    };
    j.q = function (a) {
        var b = a && a.i().o();
        return b && b in this.T && a.z() && this.isEnabled() && !this.isSlotAPersistentRoadblock(a) ? (a.O(this.T[b]), Ka(a)) : i
    };
    j.G = function (a) {
        this.q(a)
    };
    j.fillSlot = function (a, b) {
        return a && p(b) && 0 < b.length ? (this.T[a.i().toString()] = b, this.q(a)) : i
    };
    w("companionAds", function () {
        var a = V(),
            b = a.find("companion_ads");
        b || (b = new W, a.add(b));
        return b
    });
    W.prototype.fillSlot = W.prototype.fillSlot;
    W.prototype.enableSyncLoading = W.prototype.Xa;
    W.prototype.isSlotAPersistentRoadblock = W.prototype.isSlotAPersistentRoadblock;
    W.prototype.isRoadblockingSupported = W.prototype.wa;
    W.prototype.onImplementationLoaded = W.prototype.ub;
    W.prototype.notifyUnfilledSlots = W.prototype.sb;
    W.prototype.refreshAllSlots = W.prototype.vb;
    W.prototype.setRefreshUnfilledSlots = W.prototype.wb;
    W.prototype.setXfpCorrelator = W.prototype.zb;
    W.prototype.setXfpPreviousAdsToken = W.prototype.Ab;
    W.prototype.setVideoSessionInfo = W.prototype.yb;
    W.prototype.getDisplayAdsCorrelator = W.prototype.eb;
    W.prototype.getVideoStreamCorrelator = W.prototype.getVideoStreamCorrelator;
    var X = function () {
        R.call(this);
        this.m = {}
    };
    u(X, R);
    j = X.prototype;
    j.getName = function () {
        return "content"
    };
    j.q = function (a) {
        var b = a && a.i().o();
        return b in this.m && this.isEnabled() && a.z() && !a.u ? (a.O(this.m[b]), Ka(a)) : i
    };
    j.ha = function () {
        for (var a = this.l(), b = 0; b < a.length; ++b) this.q(a[b])
    };
    j.G = function (a) {
        this.q(a)
    };
    j.O = function (a, b) {
        a && (p(b) && 0 < b.length) && (this.m[a.i().o()] = b, this.q(a))
    };
    w("content", function () {
        var a = V(),
            b = a.find("content");
        b || (b = new X, a.add(b));
        return b
    });
    X.prototype.setContent = X.prototype.O;
    var Sa = h,
        Ta = ua || va || ta || "function" == typeof l.atob;
    var Y = function (a, b, c) {
        !p(a) || 0 >= a.length || !b || !c ? D().error("Illegal slot name or size in PassbackSlot(). Name: " + a + "; size: " + b + "; service: " + c) : (this.p = new P(a, 0, b), this.p.aa(c), this.ca = c)
    };
    Y.prototype.D = function (a) {
        this.p.D(a);
        return this
    };
    Y.prototype.r = function (a, b) {
        this.p.r(a, b);
        return this
    };
    Y.prototype.display = function () {
        Ua(this.ca, this.p)
    };
    Y.prototype.setClickUrl = Y.prototype.D;
    Y.prototype.setTargeting = Y.prototype.r;
    Y.prototype.display = Y.prototype.display;
    var Z = function () {
        R.call(this);
        this.v = i;
        this.a = h;
        this.d = {};
        this.Q = "";
        this.la = i;
        this.ka = g;
        this.s = this.ja = i;
        this.f = g;
        this.I = i;
        this.j = [];
        this.H = [];
        this.S = i;
        this.ma = this.na = ""
    };
    u(Z, R);
    var Va = {
        adsense_ad_format: "google_ad_format",
        adsense_ad_types: "google_ad_type",
        adsense_allow_expandable_ads: "google_allow_expandable_ads",
        adsense_background_color: "google_color_bg",
        adsense_bid: "google_bid",
        adsense_border_color: "google_color_border",
        adsense_channel_ids: "google_ad_channel",
        adsense_content_section: "google_ad_section",
        adsense_cpm: "google_cpm",
        adsense_ed: "google_ed",
        adsense_encoding: "google_encoding",
        adsense_family_safe: "google_safe",
        adsense_feedback: "google_feedback",
        adsense_flash_version: "google_flash_version",
        adsense_font_face: "google_font_face",
        adsense_font_size: "google_font_size",
        adsense_hints: "google_hints",
        adsense_host: "google_ad_host",
        adsense_host_channel: "google_ad_host_channel",
        adsense_host_tier_id: "google_ad_host_tier_id",
        adsense_keyword_type: "google_kw_type",
        adsense_keywords: "google_kw",
        adsense_line_color: "google_line_color",
        adsense_link_color: "google_color_link",
        adsense_relevant_content: "google_contents",
        adsense_reuse_colors: "google_reuse_colors",
        adsense_targeting: "google_targeting",
        adsense_targeting_types: "google_targeting",
        adsense_test_mode: "google_adtest",
        adsense_text_color: "google_color_text",
        adsense_ui_features: "google_ui_features",
        adsense_ui_version: "google_ui_version",
        adsense_url_color: "google_color_url",
        alternate_ad_iframe_color: "google_alternate_color",
        alternate_ad_url: "google_alternate_ad_url",
        demographic_age: "google_cust_age",
        demographic_ch: "google_cust_ch",
        demographic_gender: "google_cust_gender",
        demographic_interests: "google_cust_interests",
        demographic_job: "google_cust_job",
        demographic_l: "google_cust_l",
        demographic_lh: "google_cust_lh",
        demographic_u_url: "google_cust_u_url",
        demographic_unique_id: "google_cust_id",
        document_language: "google_language",
        geography_override_city: "google_city",
        geography_override_country: "google_country",
        geography_override_region: "google_region",
        page_url: "google_page_url"
    };
    Z.prototype.ha = function () {
        if (this.f) {
            if (!this.v) {
                var a = document,
                    b = a.createElement("script");
                V();
                b.async = g;
                b.type = "text/javascript";
                b.src = this.n();
                (a = a.getElementsByTagName("head")[0] || a.getElementsByTagName("body")[0]) ? (this.log.info("Fetching GPT implementation", this), a.appendChild(b), this.v = g) : this.log.error("Unable to fetch GPT implementation", this)
            }
        } else Wa(this)
    };
    Z.prototype.getName = function () {
        return "publisher_ads"
    };
    Z.prototype.n = function () {
        return Ja() + "//partner.googleadservices.com/gampad/google_ads_gpt.js"
    };
    var Wa = function (a) {
        var b = V();
        !a.v && !b.R && (b = document, a.v = g, b.write('<script type="text/javascript" src="' + Ia(a.n()) + '"><\/script>'))
    };
    Z.prototype.tb = function () {
        V();
        var a = v().impl;
        if (a && a.pubads) {
            this.a = a.pubads;
            this.log.info("GPT implementation fetched.", this);
            this.ka || this.a.disableFetch();
            this.I && this.a.collapseEmptyDivs();
            if (this.s) {
                this.f ? this.a.enableAsyncSingleRequest() : this.a.enableSingleRequest();
                Xa(this);
                for (var a = this.l(), b = 0; b < a.length; ++b) Ya(this, a[b])
            } else this.f && this.a.enableAsyncRendering();
            this.ja && this.a.disableInitialLoad();
            Za(this);
            if (0 < this.j.length) for (b = 0; b < this.j.length; ++b) this.G(this.j[b]);
            if (0 < this.H.length) for (b = 0; b < this.H.length; ++b) Ua(this, this.H[b])
        } else this.log.error("Unable to fetch pubads service implementation from " + this.n(), this)
    };
    Z.prototype.Y = function (a) {
        this.f || (a.P = i);
        R.prototype.Y.call(this, a)
    };
    Z.prototype.G = function (a) {
        if (V().R && !this.f) this.log.error("Attempting to display ad in sync mode after page load is complete.", this);
        else if (this.a) {
            if (Xa(this), this.s || Ya(this, a)) this.log.info("Calling fillslot"), this.a.fillSlot(a)
        } else if (this.f || this.v && 0 == this.j.length) {
            for (var b = i, c = 0; c < this.j.length; ++c) a === this.j[c] && (b = g);
            b || (this.log.info("Delaying rendering of ad slot " + a.getName() + " pending loading of the GPT implementation", this, a), this.j.push(a))
        } else this.log.error("Skipping rendering of slot " + a.getName() + " due to missing GPT implementaition", this, a)
    };
    var Ya = function (a, b) {
        if (a.a && a.a.addSlot(b) == h) return a.log.error("Unable to process name for slot " + b.getName(), a, b), i;
        for (var c = b.A(), d = 0; d < c.length; ++d) c[d] in Va ? a.a.addAdSenseSlotAttribute(b, Va[c[d]], b.get(c[d])) : C(a.log, "Ignoring unknown pubads attribute " + c[d] + " with value " + b.get(c[d]) + " for slot " + b.getName(), a, b);
        if (r(a.a.addSlotTargeting)) {
            var c = [],
                f;
            for (f in b.d) r(b.d[f]) || c.push(f);
            for (f = 0; f < c.length; ++f) a.a.addSlotTargeting(b, c[f], c[f] in b.d ? b.d[c[f]] : [])
        }
        b.U() && r(a.a.Oa) && a.a.Oa(b, b.U());
        return g
    }, Xa = function (a) {
        if (!a.la) {
            a.la = g;
            for (var b = a.A(), c = 0; c < b.length; ++c) b[c] in Va ? a.a.addAdSensePageAttribute(Va[b[c]], a.get(b[c])) : C(a.log, "Ignoring unknown pubads attribute " + b[c] + " with value " + a.get(b[c]), a);
            a.a.addAdSensePageAttribute("google_tag_info", "v2");
            for (var d in a.d) if (b = a.d[d], m(b)) for (c = 0; c < b.length; ++c) a.a.addAttribute(d, b[c]);
            a.Q && a.a.setLocation(a.Q)
        }
    };
    j = Z.prototype;
    j.r = function (a, b) {
        var c = [];
        p(b) ? c.push(b) : c = b;
        var d = [" targeting attribute ", a, " with value ", c.join(), " for service ", this.getName()].join("");
        a && p(a) ? (this.d[a] = c, this.log.info("Setting" + d, this)) : C(this.log, "Unable to set" + d, this);
        return this
    };
    j.rb = function () {
        this.a ? C(this.log, "Ignoring noFetch since the pubads service is already enabled", this) : this.ka = i
    };
    j.disableInitialLoad = function () {
        this.a ? C(this.log, "Ignoring disableInitialLoad since the pubads service is already enabled", this) : this.ja = g
    };
    j.enableSingleRequest = function () {
        this.isEnabled() && !this.s ? C(this.log, "Ignoring change to single request mode since the service is already enabled", this) : (this.log.info("Using single request mode to fetch ads", this), this.s = g);
        return this.s
    };
    j.enableAsyncRendering = function () {
        this.isEnabled() && !this.f ? C(this.log, "Ignoring change to async-rendering mode since the service is already enabled", this) : (this.log.info("Using async-rendering mode to fetch ads", this), this.f = g);
        return this.f
    };
    j.Ya = function () {
        if (this.isEnabled() && this.f) C(this.log, "Ignoring change to async-rendering mode since the service is already enabled", this);
        else {
            this.log.info("Using sync-rendering mode to fetch ads", this);
            this.f = i;
            for (var a = this.l(), b = 0; b < a.length; ++b) a[b].P = i
        }
        return !this.f
    };
    j.Wa = function (a, b) {
        return new Y(a, b, this)
    };
    var Ua = function (a, b) {
        Wa(a);
        a.a ? r(a.a.passback) ? a.a.passback(b) : a.log.error("The GPT impl does not yet support passbacks.", a, b) : (a.log.info("Delaying passback of ad slot " + b.getName() + " pending loading of the GPT implementation", a, b), a.H.push(b))
    };
    j = Z.prototype;
    j.refresh = function (a) {
        if (a && !m(a)) C(this.log, "Slots to refresh must be an array.", this);
        else if (this.a) {
            var b = h;
            if (a) {
                for (var b = [], c = 0; c < a.length; ++c) {
                    var d = a[c];
                    d instanceof P ? b.push(d) : C(this.log, "Slot object at position " + c + " is of incorrect type.", this)
                }
                if (!b.length) {
                    this.log.error("No valid slot ids found, refresh aborted.", this);
                    return
                }
            }
            this.log.info("Refreshing ads", this);
            SugarAds.gptReady = true;
            this.a.refresh(b)
        } else { SugarAds.gptReady = false; C(this.log, "The ads cannot be refreshed because the GPT implementation Javascript is not yet loaded.",
            this) }
    };
    j.xa = function (a, b, c, d, f, k, n, x) {
        if (a && !m(a)) C(this.log, "Slots to refresh must be an array.", this);
        else if (b && !q(b)) C(this.log, "Correlator must be a number.", this);
        else if (c && !p(c)) C(this.log, "Pstok must be a string.", this);
        else if (d && !p(d)) C(this.log, "Video IU must be a string.", this);
        else if (f && !m(f)) C(this.log, "Video IU sizes must be an array.", this);
        else if (k && !q(k)) C(this.log, "Pod number must be a number.", this);
        else if (n && !q(n)) C(this.log, "Pod position must be a number.", this);
        else if (x && "boolean" != typeof x) C(this.log, "Persistent roadblocks only must be a boolean.", this);
        else if (this.a) {
            var z = h;
            if (a) {
                for (var z = [], s = 0; s < a.length; ++s) {
                    var t = a[s];
                    t instanceof P ? z.push(t) : C(this.log, "Slot object at position " + s + " is of incorrect type.", this)
                }
                if (!z.length) {
                    this.log.error("No valid slot ids found, refresh aborted.", this);
                    return
                }
            }
            if (f) for (s = 0; s < f.length; ++s) {
                a = f[s];
                if (!m(a) || 2 != a.length) {
                    this.log.error("Video size array must have only two values, refresh aborted.", this);
                    return
                }
                for (t = 0; t < a.length; ++t) if (!q(a[t])) {
                    this.log.error("Video size array must contain only numbers, refresh aborted.",
                        this);
                    return
                }
            }
            this.log.info("Refreshing ads", this);
            this.a.refresh(z, b, c, d, f, k, n, x)
        } else C(this.log, "The ads cannot be refreshed because the GPT implementation Javascript is not yet loaded.", this)
    };
    j.Za = function () {
        this.S = g;
        Za(this)
    };
    j.xb = function (a, b) {
        this.S = g;
        this.na = a;
        this.ma = b;
        Za(this)
    };
    j.pb = function () {
        return !this.a || this.a.getVideoContentInformation == h ? h : this.a.getVideoContentInformation()
    };
    var Za = function (a) {
        a.S && (a.a && a.a.setVideoContentInformation) && a.a.setVideoContentInformation(a.na, a.ma)
    };
    j = Z.prototype;
    j.getCorrelator = function () {
        return 0 == this.l().length ? "not_available" : !this.a ? "not_loaded" : this.a.getCorrelator == h ? "not_available" : this.a.getCorrelator()
    };
    j.getVideoStreamCorrelator = function () {
        if (!this.a || this.a.getVideoStreamCorrelator == h) return 0;
        var a = this.a.getVideoStreamCorrelator();
        return isNaN(a) ? 0 : a
    };
    j.isAdRequestFinished = function () {
        return !this.a ? i : this.a.isAdRequestFinished != h ? this.a.isAdRequestFinished() : h
    };
    j.isSlotAPersistentRoadblock = function (a) {
        return this.a && this.a.isSlotAPersistentRoadblock != h ? this.a.isSlotAPersistentRoadblock(a) : i
    };
    j.collapseEmptyDivs = function () {
        this.I ? C(this.log, "Ignoring subsequent call to set div collapse mode (already set)", this) : this.isEnabled() ? C(this.log, "Ignoring change to div collapse mode since the service is already enabled", this) : (this.log.info("Enabling collapsing of containers when there is no ad content", this), this.I = g);
        return this.I
    };
    j.clear = function () {
        if (!this.a) return C(this.log, "The slot contents cannot be cleared because the GPT implementation Javascript is not yet loaded.", this), i;
        if (this.a.clearSlotContents != h) return this.log.info("Clearing slot contents.", this), this.a.clearSlotContents();
        C(this.log, "The GPT implementation does not yet support clearing slots.");
        return i
    };
    j.clearNoRefreshState = function () {
        this.a ? this.a.clearNoRefreshState != h ? (this.log.info("Clearing no_refresh state.", this), this.a.clearNoRefreshState()) : C(this.log, "The GPT implementation does not yet support clearNoRefreshState") : C(this.log, "The no_refresh state cannot be cleared because the GPT implementation Javascript is not yet loaded.", this)
    };
    j.clearSlotTargeting = function (a) {
        this.a && r(this.a.clearSlotTargeting) && this.a.clearSlotTargeting(a)
    };
    j.ra = function (a, b, c) {
        this.a && r(this.a.addSlotTargeting) && this.a.addSlotTargeting(a, b, c)
    };
    j.setLocation = function (a, b, c) {
        var d = "role:1 producer:12";
        if (b !== e) {
            if (!q(a) || !q(b)) return C(this.log, "Latitude and longitude are expected to be numbers"), this;
            d += " latlng{ latitude_e7: " + Math.round(1E7 * a) + " longitude_e7: " + Math.round(1E7 * b) + "}";
            if (c !== e) {
                if (isNaN(c)) return C(this.log, "Radius is expected to be a number"), this;
                d += " radius:" + Math.round(c)
            }
        } else 50 < a.length && (b = a.substring(0, 50), C(this.log, "Location: " + a + " is longer than 50. Truncating it to" + b + "."), a = b), d += ' loc:"' + a + '"';
        if (Ta) d = l.btoa(d);
        else {
            a = d;
            d = [];
            for (c = b = 0; c < a.length; c++) {
                for (var f = a.charCodeAt(c); 255 < f;) d[b++] = f & 255, f >>= 8;
                d[b++] = f
            }
            if (!ba(d)) throw Error("encodeByteArray takes an array as a parameter");
            if (!Sa) {
                Sa = {};
                for (a = 0; 65 > a; a++) Sa[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)
            }
            a = Sa;
            b = [];
            for (c = 0; c < d.length; c += 3) {
                var k = d[c],
                    n = (f = c + 1 < d.length) ? d[c + 1] : 0,
                    x = c + 2 < d.length,
                    z = x ? d[c + 2] : 0,
                    s = k >> 2,
                    k = (k & 3) << 4 | n >> 4,
                    n = (n & 15) << 2 | z >> 6,
                    z = z & 63;
                x || (z = 64, f || (n = 64));
                b.push(a[s], a[k], a[n], a[z])
            }
            d = b.join("")
        }
        this.Q = "a " + d;
        return this
    };
    w("pubads", function () {
        var a = V(),
            b = a.find("publisher_ads");
        b || (b = new Z, a.add(b));
        return b
    });
    Z.prototype.clear = Z.prototype.clear;
    Z.prototype.clearNoRefreshState = Z.prototype.clearNoRefreshState;
    Z.prototype.collapseEmptyDivs = Z.prototype.collapseEmptyDivs;
    Z.prototype.definePassback = Z.prototype.Wa;
    Z.prototype.enableAsyncRendering = Z.prototype.enableAsyncRendering;
    Z.prototype.enableSingleRequest = Z.prototype.enableSingleRequest;
    Z.prototype.enableSyncRendering = Z.prototype.Ya;
    Z.prototype.enableVideoAds = Z.prototype.Za;
    Z.prototype.getCorrelator = Z.prototype.getCorrelator;
    Z.prototype.getVideoContent = Z.prototype.pb;
    Z.prototype.getVideoStreamCorrelator = Z.prototype.getVideoStreamCorrelator;
    Z.prototype.isAdRequestFinished = Z.prototype.isAdRequestFinished;
    Z.prototype.isSlotAPersistentRoadblock = Z.prototype.isSlotAPersistentRoadblock;
    Z.prototype.noFetch = Z.prototype.rb;
    Z.prototype.onGoogleAdsJsLoad = Z.prototype.tb;
    Z.prototype.refresh = Z.prototype.refresh;
    Z.prototype.setLocation = Z.prototype.setLocation;
    Z.prototype.setTargeting = Z.prototype.r;
    Z.prototype.setVideoContent = Z.prototype.xb;
    Z.prototype.videoRefresh = Z.prototype.xa;
    var $a = /#|$/,
        ab = function (a, b) {
            var c = a.search($a),
                d;
            a: {
                d = 0;
                for (var f = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                    var k = a.charCodeAt(d - 1);
                    if (38 == k || 63 == k) if (k = a.charCodeAt(d + f), !k || 61 == k || 38 == k || 35 == k) break a;
                    d += f + 1
                }
                d = -1
            }
            if (0 > d) return h;
            f = a.indexOf("&", d);
            if (0 > f || f > c) f = c;
            d += b.length + 1;
            return decodeURIComponent(a.substr(d, f - d).replace(/\+/g, " "))
        };
    var bb = function () {
        var a = window,
            b = document;
        if (v()._pubconsole_disable_) return i;
        var c;
        c = document.cookie.split("google_pubconsole=");
        if (c = 2 == c.length ? c[1].split(";")[0] : "") if (c = c.split("|"), 0 < c.length && ("1" == c[0] || "0" == c[0])) return g;
        V();
        c = i;
        try {
            c = a.top.document.URL === b.URL
        } catch (d) {}
        a = c ? b.URL : b.referrer;
        return ab(a, "google_debug") !== h || ab(a, "google_console") !== h || ab(a, "google_force_console") !== h
    };
    fa(window, function () {
        if (bb()) {
            var a = document,
                b = a.createElement("script");
            b.type = "text/javascript";
            b.src = Ja() + "//publisherconsole.appspot.com/js/loader.js";
            b.async = g;
            (a = a.getElementsByTagName("script")[0]) && a.parentNode && a.parentNode.insertBefore(b, a)
        }
    });
    w("disablePublisherConsole", function () {
        v()._pubconsole_disable_ = g
    });
    var $ = v().cmd;
    if (!$ || m($)) {
        var cb = v().cmd = new E;
        $ && 0 < $.length && cb.push.apply(cb, $)
    }(function () {
        var a = document.getElementsByTagName("script");
        0 < a.length && (a = a[a.length - 1], a.src && (0 <= a.src.indexOf("/tag/js/gpt.js") && a.innerHTML && !a.googletag_executed) && (a.googletag_executed = g, eval(a.innerHTML)))
    })();
})()