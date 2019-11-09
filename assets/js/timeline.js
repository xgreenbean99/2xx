// JavaScript Document

window.onload = getTimeLine();

function getTimeLine(curCnt = 0) {
	var counter = curCnt;
	var pgbuild = '';
	var cls = '';
	var options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	$.ajax({
		method: 'GET',
		url: 'https://step-017.inside-out-project.com/wp-json/wp/v2/posts?categories=12&offset=' + curCnt,
		dataType: 'json',
		success: function (data) {
			data.forEach(function (item) {

				var eventDate = new Date('' + item.acf.event_date + ', 00:00:00');

				cls = (cls === 'class="timeline-inverted"') ? '' : 'class="timeline-inverted"';

				var dataDateSort = item.acf.event_date.replace(/-/g, "");

				pgbuild = '<li class="timeline-inverted" data-sortdate="' + dataDateSort + '"><div class="timeline-badge success"><i class="glyphicon glyphicon-thumbs-up"></i></div></i></div><div class="timeline-panel"><div class="timeline-heading"><h4 class="timeline-title">' + item.title.rendered + '</h4><p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ' + eventDate.toLocaleDateString('en-US', options) + '</small></p></div><div class="timeline-body">' + item.content.rendered.slice(0, 250) + '</div></div></li>';

				$(".timeline").append(pgbuild);

			});

			if (Object.keys(data).length >= 1) {
				getTimeLine(counter + 10);
			} else {
				wrapUp();
			}
		},
		error: function () {
			console.log('bad');
		}

	});
}

function wrapUp() {
	$(".timeline").each(function () {
		$(this).html($(this).children('li').sort(function (a, b) {
			return ($(b).data('sortdate')) < ($(a).data('sortdate')) ? 1 : -1;
		}));
		$(".timeline-inverted:nth-child(odd)").removeClass("timeline-inverted");
	});

	$("#loaderDiv").hide(1000);
}
