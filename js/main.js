(function (window, $) {

  var varsTemplate = 'controls=true&file=';
  var videoTemplate = [
    '<li class="video" data-video="$PATH">',
          '<div class="thumbnail"><img src="$THUMB"><span class="play"></span></div>',
          '<h2 class="title">$TITLE</h2>',
          '<p class="desc" style="display:none">$DESC</p>',
          '<h3 class="speaker">$SPEAKER</h3>',
          '<p class="creds">$CREDS</p>',
          '<p class="bio">$BIO</p>',
      '</li>'
  ].join('');
  var chromeTemplate = [
      '<div class="player-video">',
          '<video class="mejs-ted" id="video-main" width="100%" height="100%" poster="$IMAGE" controls="controls" preload="none">',
              '<source id="video-source" type="video/mp4" src="$PATH">',
              '<object width="100%" height="100%" type="application/x-shockwave-flash" data="player/flashmediaelement.swf">',
                  '<param name="movie" value="player/flashmediaelement.swf">',
                  '<param id="video-flashvars" name="flashvars" value="controls=true&file=$PATH">',
                  '<img src="$IMAGE">',
              '</object>',
          '</video>',
      '</div>',
      '<div class="player-sidebar">',
          '<p class="speaker">$SPEAKER</p>',
          '<h2 class="title">$TITLE</h2>',
          '<p class="desc">$DESC</p>',
      '</div>',
      '<span class="close" id="close">CLOSE</span>'
  ].join('');
  var list = $('#video-list');
  var playerShell = $('#player');
  var logo = $('#logo');

  // Set up UI event handling
  playerShell.on('click', '#close', closeVideo);
  logo.on('click', closeVideo);
  list.on('click', '.video', playVideo);

  // Get list of all videos
  $.librarian.files.list('ted', function (data) {
    if (data == null) {
      videoList.text('No videos found. Please wait a until at least some ' +
        'videos are downloaded.');
      return;
    }
    processVideoList(data.files);
  });

  function processVideoList (files) {
    var split;
    var filedata = {};
    var i = files.length;
    var listHtml = '';
    var key;
    var toProcess = 0;

    for (; i; i--) {
      file = files[i - 1];
      split = splitext(file.name);
      setobj(filedata, split[0])[split[1]] = file.path;
    }
    
    for (key in filedata) {
      toProcess += 1;
      var vid = filedata[key];
      var thumbUrl = $.librarian.files.url(vid['.jpg']);
      var metaUrl = $.librarian.files.url(vid['.json']);
      var vidUrl = $.librarian.files.url(vid['.mp4']);
      $.getJSON(metaUrl, function (data) {
        var vidHtml = videoTemplate
          .replace('$THUMB', thumbUrl)
          .replace('$TITLE', data.title)
          .replace('$DESC', data.description)
          .replace('$SPEAKER', data.speaker)
          .replace('$CREDS', data.creds)
          .replace('$BIO', data.bio)
          .replace('$PATH', vidUrl);
        listHtml += vidHtml;
        toProcess -= 1;
        if (!toProcess) {
          list.html(listHtml);
        }
      });
    }
  }

  function setobj(obj, key) {
    obj[key] = obj[key] || {};
    return obj[key];
  }

  function splitext(path) {
    var comps = path.split('.');
    return [comps.slice(0, -1).join('.'), '.' + comps.slice('-1')[0]];
  }

  function closeVideo () {
    playerShell.hide().html('');
  }

  function playVideo (e) {
    var el = $(this);
    var path = el.data('video');
    var speaker = el.find('.speaker').text();
    var title = el.find('.title').text();
    var desc = el.find('.desc').text();
    var image = el.find('.thumbnail img').attr('src');
    var chrome = chromeTemplate
      .replace(/\$PATH/g, path)
      .replace(/\$IMAGE/g, image)
      .replace('$SPEAKER', speaker)
      .replace('$TITLE', title)
      .replace('$DESC', desc);
    playerShell.html(chrome);
    $('#video-main').mediaelementplayer();
    playerShell.show();
  }
}(this, jQuery));
