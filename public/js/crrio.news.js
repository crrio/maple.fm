$("#news").rss(
  "http://blog.crr.io/rss/",
  {
    limit: 1,
    offsetStart: false,
    offsetEnd: false,
    ssl: false,
    host: 'feedrapp.info',
    layoutTemplate: "<div class='feed-container'>{entries}</div>",
    entryTemplate: '<h4 style="padding:5px 10px;background:#F1F1F1;"><a href="{url}">{title}</a></h4><p>{body}</p>',
    dateFormat: 'MMMM Do, YYYY',
    dateLocale: 'en',
    // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
    effect: 'slideFastSynced',
  });