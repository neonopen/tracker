# tracker

## Generation

There are many options. `generate_tracker.py` has a definitive list but:

- `--upload_location` can be `s3test` or `s3prod`
- `--trackerid 1234567890` (optional, see Dixon)
- `--trackermode` can be `simple` or (defaults to) `normal`
- `--minify` can be `0` or `1` 

## Dixon (generic)

We can generate without a `trackerid`, e.g.:

- `./generate_tracker.py --minify 0 --upload_location s3test`
- `./generate_tracker.py --minify 1 --upload_location s3prod`

* Note to test somewhat and see snippet, run a local web server and point at `http://localhost/dixon/snippet.html`

## Snippets

### Brightcove Gallery + Test

```javascript
<script id="neon">
    var neonPublisherId = 'XXXXXXXXXX';
    var neonBrightcoveGallery = true;
</script>
<script src="//neon-test.s3.amazonaws.com/neonoptimizer_dixon.js"></script>
```

### Brightcove Gallery + Production

```javascript
<script id="neon">
    var neonPublisherId = 'XXXXXXXXXX';
    var neonBrightcoveGallery = true;
</script>
<script src="//cdn.neon-lab.com/neonoptimizer_dixon.js"></script>
```

### NOT Brightcove Gallery + Test

```javascript
<script id="neon">
    var neonPublisherId = 'XXXXXXXXXX';
</script>
<script src="//neon-test.s3.amazonaws.com/neonoptimizer_dixon.js"></script>
```

### NOT Brightcove Gallery + Production

```javascript
<script id="neon">
    var neonPublisherId = 'XXXXXXXXXX';
</script>
<script src="//cdn.neon-lab.com/neonoptimizer_dixon.js"></script>
```

## includes

This will compare the ID of the customer we are generating the Javascript for with the id parameter passed in the include. The goal here is to have one master file and drive the customer specific code through the use of conditional includes.

To include a file from the `_partials` directory at compile time, use code of the format below:

```
{% include any-filename-you-like.extension id="[customer id]" %}
```

For example:

```
{% include 2089095449.test.js id="2089095449" %}
```

- The file should exist in the `_partials` directory
- If there is no match on id then the include call is removed
- If there is a match on id then we try to include the contents of the file
- If we cannot find the file then we log an error and remove the include in the compiled JS

## Testing

### Discovery

- https://docs.google.com/a/neon-lab.com/document/d/1MP28sVWpckEM3ee0bfN1ojepdVPZdVSOVTpSnDu95TM/edit?usp=sharing

### Includes

There are two test you can include in the template `basic_modules.js.template` that can be used for testing. Add in:

```
{% include 123456789.test.js id="123456789" %}
{% include 987654321.test.js id="123456789" %}
```

If you run

```
./generate_tracker.py --trackerid 123456789
```

- You should see an error in the console AND in the generated file `neon_main_123456789.js`.
- You should also see the contents of `123456789.test.js` included into `neon_main_123456789.js`

## Examples

### MSN

- ```./generate_tracker.py --trackerid 603225904 --minify 0 --upload_location s3test --trackermode simple```
- ```./generate_tracker.py --trackerid 603225904 --minify 1 --upload_location s3prod --trackermode simple```

### Gannett

- ```./generate_tracker.py --trackerid 1554964958 --custom_module 'js/neonbcoveplayer.js'```
- ```./generate_tracker.py --trackerid 1554964958 --minify 1 --upload_location s3prod --custom_module 'js/neonbcoveplayer.js'```

### FOX

- ```./generate_tracker.py --trackerid 1930337906```
- ```./generate_tracker.py --trackerid 1930337906 --minify 0 --upload_location s3test```

### CNN
- ```./generate_tracker.py --trackerid 1657678658```
- ```./generate_tracker.py --trackerid 1657678658 --minify 1 --upload_location s3prod```

## Release process 

- ```sh minifier.sh js/neon.js js/neon-main.js```
- ```sh minifier.sh js/neonbootloader.js js/neonbctracker.js```
