$(document).ready(function() {
    $('#language-select').on('change', function() {
        var selectedLang = $(this).val();
        if (selectedLang === 'ko') {
            $('h1').text('이미지 및 비디오 워터마킹');
            $('h2:contains("Upload Image and Add Watermark")').text('이미지 업로드 및 워터마크 추가');
            $('h2:contains("Upload Video and Add Watermark")').text('비디오 업로드 및 워터마크 추가');
            $('h2:contains("Extract Watermark from Image")').text('이미지에서 워터마크 추출');
            $('h2:contains("Extract Watermark from Video")').text('비디오에서 워터마크 추출');
            $('input[name="text"]').attr('placeholder', '워터마크 텍스트 입력');
            $('button:contains("Choose File")').text('파일 선택');
            $('button:contains("Upload")').text('업로드');
            $('button:contains("Extract")').text('추출');
            $('#image-drop-zone').html('<p>여기에 이미지를 드래그 앤 드롭하세요</p>');
            $('#video-drop-zone').html('<p>여기에 비디오를 드래그 앤 드롭하세요</p>');
            $('footer a:contains("Go to Extract Watermark Page")').text('워터마크 추출 페이지로 이동');
            $('footer a:contains("Go to Main Page")').text('메인 페이지로 이동');
        } else {
            $('h1').text('Image and Video Watermarking');
            $('h2:contains("이미지 업로드 및 워터마크 추가")').text('Upload Image and Add Watermark');
            $('h2:contains("비디오 업로드 및 워터마크 추가")').text('Upload Video and Add Watermark');
            $('h2:contains("이미지에서 워터마크 추출")').text('Extract Watermark from Image');
            $('h2:contains("비디오에서 워터마크 추출")').text('Extract Watermark from Video');
            $('input[name="text"]').attr('placeholder', 'Enter watermark text');
            $('button:contains("파일 선택")').text('Choose File');
            $('button:contains("업로드")').text('Upload');
            $('button:contains("추출")').text('Extract');
            $('#image-drop-zone').html('<p>Drag & Drop Image Here or Click to Upload</p>');
            $('#video-drop-zone').html('<p>Drag & Drop Video Here or Click to Upload</p>');
            $('footer a:contains("워터마크 추출 페이지로 이동")').text('Go to Extract Watermark Page');
            $('footer a:contains("메인 페이지로 이동")').text('Go to Main Page');
        }
    });

    $('.drop-zone').on('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('drag-over');
    });

    $('.drop-zone').on('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drag-over');
    });

    $('#image-drop-zone').on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drag-over');
        var files = e.originalEvent.dataTransfer.files;
        $('#image-form input[type="file"]').prop('files', files).trigger('change');
    });

    $('#video-drop-zone').on('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drag-over');
        var files = e.originalEvent.dataTransfer.files;
        $('#video-form input[type="file"]').prop('files', files).trigger('change');
    });

    $('#image-drop-zone').on('click', function() {
        $('#image-form input[type="file"]').click();
    });

    $('#video-drop-zone').on('click', function() {
        $('#video-form input[type="file"]').click();
    });

    $('#image-form input[type="file"], #video-form input[type="file"]').on('change', function() {
        var fileName = $(this).val().split('\\').pop();
        $(this).siblings('p').text(fileName);
    });
});
