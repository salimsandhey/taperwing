// Custom Video Player for TaperWing
document.addEventListener('DOMContentLoaded', function() {
	// Add click event to the video button in hero section
	var videoButton = document.querySelector('.tp-hero-video-btn');
	
	// Function to stop all videos
	function stopAllVideos() {
		var videos = document.querySelectorAll('video');
		videos.forEach(function(video) {
			video.pause();
			video.currentTime = 0;
		});
	}
	
	// Stop videos when page is unloaded (navigation)
	window.addEventListener('beforeunload', function() {
		stopAllVideos();
	});
	
	// Stop videos when page is hidden (tab switch, etc.)
	document.addEventListener('visibilitychange', function() {
		if (document.hidden) {
			stopAllVideos();
		}
	});
	
	// Also handle page hide event for better browser support
	window.addEventListener('pagehide', function() {
		stopAllVideos();
	});
	
	if (videoButton) {
		videoButton.addEventListener('click', function(e) {
			e.preventDefault();
			
			// Remove any existing modals first
			var existingModal = document.getElementById('custom-video-modal');
			if (existingModal) {
				// Stop any playing video in the existing modal
				var existingVideo = existingModal.querySelector('video');
				if (existingVideo) {
					existingVideo.pause();
					existingVideo.currentTime = 0;
				}
				existingModal.remove();
			}
			
			// Create custom modal
			var modal = document.createElement('div');
			modal.id = 'custom-video-modal';
			modal.style.cssText = 'display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 9999; justify-content: center; align-items: center;';
			
			var videoContainer = document.createElement('div');
			videoContainer.style.cssText = 'position: relative; max-width: 90%; max-height: 80%;';
			
			var video = document.createElement('video');
			video.id = 'custom-video-player';
			video.style.cssText = 'max-width: 100%; height: 800px;';
			video.autoplay = true;
			video.playsInline = true;
			video.controls = true; // Add controls for better user experience
			
			var source = document.createElement('source');
			source.src = 'assets/video/pooja intro video.mp4';
			source.type = 'video/mp4';
			
			var closeBtn = document.createElement('button');
			closeBtn.id = 'close-video-modal';
			closeBtn.innerHTML = '&times;';
			closeBtn.style.cssText = 'position: absolute; top: -40px; right: 0; background: transparent; border: none; color: white; font-size: 30px; cursor: pointer;';
			
			video.appendChild(source);
			videoContainer.appendChild(video);
			videoContainer.appendChild(closeBtn);
			modal.appendChild(videoContainer);
			document.body.appendChild(modal);
			
			// Play the video
			video.play().catch(function(error) {
				console.log('Autoplay failed:', error);
			});
			
			// Close modal events
			function closeModal() {
				video.pause();
				video.currentTime = 0;
				if (document.body.contains(modal)) {
					document.body.removeChild(modal);
				}
			}
			
			closeBtn.addEventListener('click', closeModal);
			
			modal.addEventListener('click', function(e) {
				if (e.target === modal) {
					closeModal();
				}
			});
			
			// Handle escape key to close modal
			var escapeHandler = function(e) {
				if (e.key === 'Escape' && document.getElementById('custom-video-modal')) {
					closeModal();
					document.removeEventListener('keydown', escapeHandler);
				}
			};
			
			document.addEventListener('keydown', escapeHandler);
		});
	}
	
	// Also handle any existing video modals in the HTML
	var existingVideo = document.getElementById('custom-video-player');
	if (existingVideo) {
		existingVideo.removeAttribute('autoplay');
	}
});