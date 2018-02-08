$(document).ready(function() {

	"use strict";

	image_bg();
	showcase();
	projects();
	about();

});

$(window).on('load', function() {

	first_load();

});


/** load
-------------------------------------------------- **/

function first_load() {
	$('body').waitForImages({
		finished: function() {
			setTimeout(function() {
				$('#fade').addClass('hide');
			}, 500);
		},
		waitForAll: true
	});
}


/** background images
-------------------------------------------------- **/

function image_bg() {
	$('[data-bg]').each(function() {
		var bg = $(this).data('bg');

		$(this).css({
			'background-image': 'url(' + bg + ')',
			'background-size': 'cover',
			'background-position': 'center center'
		});
	});
}


/** showcase works
-------------------------------------------------- **/

function showcase() {
	var total = $('.preview').length,
		rand = Math.floor(Math.random() * total);

	$($('.preview')[rand]).addClass('active');

	$('.projects-list li a').on('mouseenter', function() {
		$('.projects-list li a').stop().animate({
			'opacity': 0.3
		}, 250);
		$(this).stop().animate({
			'opacity': 1
		});

		var ref = $(this).data('ref'),
			preview = $('.preview.' + ref);

		$('.previews').find('.preview').removeClass('active');
		preview.addClass('active');
	}).on('mouseleave', function() {
		$('.projects-list li a').stop().animate({
			'opacity': 1
		}, 250);
	});
}



/** projects
-------------------------------------------------- **/

function projects() {
	$('.projects-list li a').on('click', function() {
		var url = $(this).data('url');

		$('#loader').addClass('visible');

		setTimeout(function() {
			$('#project #project-content').load(url + ' .project-content-inner', function() {
				$('.project-content-inner').waitForImages({
					finished: function() {
						setTimeout(function() {
							$('.showcase').addClass('project-open');
							$('#project').addClass('open');
						}, 500);

						setTimeout(function() {
							$('#loader').removeClass('visible');
							$('.close-project').addClass('show');
						}, 1500);
					},
					waitForAll: true
				});
			});
		}, 1000);

		return false;
	});

	$('.close-project').on('click', function() {
		$(this).removeClass('show');

		setTimeout(function() {
			$('.showcase').removeClass('project-open');
			$('#project').removeClass('open');
		}, 500);

		setTimeout(function() {
			$('.project-content-inner').remove();
		}, 1500);
	});
}


/** about
-------------------------------------------------- **/

function about() {
	$('.about-link').on('click', function() {
		var page = $(this).data('url');

		$('#loader').addClass('visible');

		setTimeout(function() {
			$('#about #about-content').load(page + ' .about-content-inner', function() {
				setTimeout(function() {
					$('.showcase').addClass('about-open');
					$('#about').addClass('open');
				}, 300);

				setTimeout(function() {
					$('#loader').removeClass('visible');
				}, 1500);
			});
		}, 1000);
	});

	$(document).on('click', '.about-close', function() {
		$('#about').removeClass('open');
		$('.showcase').removeClass('about-open');

		setTimeout(function() {
			$('.about-content-inner').remove();
		}, 1000);
	});
}
