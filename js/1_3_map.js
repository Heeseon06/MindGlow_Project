
document.addEventListener('DOMContentLoaded', (event) => {
    const t_c_m = document.getElementById('toggle-category-menu');
    t_c_m.addEventListener('click', function () {
        const categoryMenu = document.getElementById('categoryMenu');
        categoryMenu.classList.toggle('hidden');
        this.blur();
    });

    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const categoryMenu = document.getElementById('categoryMenu');
            categoryMenu.classList.toggle('hidden');
            const text = this.textContent;
            t_c_m.textContent = text;
        });
    });

    let combinedCenters;
    let infowindow;
    let map;

    function initMap() {
        let mapContainer = document.getElementById('map');
        let mapOption = {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심 위치 (서울)
            level: 7 // 지도 확대 레벨
        };
        map = new kakao.maps.Map(mapContainer, mapOption);
        infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        fetch('../CenterDB/combinedCenters.json')
            .then(response => response.json())
            .then(data => {
                combinedCenters = data;
                loadMarkers();
            })
            .catch(error => console.error('Error fetching JSON data:', error));
    }

    function loadMarkers() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const markers = [];
        categoryButtons.forEach(button => {
            button.addEventListener('click', function () {
                const category = this.dataset.category;
                const icon = this.dataset.icon;
                markers.forEach(marker => marker.setMap(null));
                markers.length = 0;
                combinedCenters.forEach(location => {
                    if (location.kind === category) {
                        const markerPosition = new kakao.maps.LatLng(location.lat, location.lot);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition,
                            map: map,
                            title: location.centerName,
                            image: new kakao.maps.MarkerImage(icon, new kakao.maps.Size(30, 35))
                        });
                        markers.push(marker);
                        kakao.maps.event.addListener(marker, 'click', function () {
                            displayInfowindow(marker, location);
                        });
                    }
                });
            });
        });
    }

    function searchLocation() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const markers = [];
        markers.forEach(marker => marker.setMap(null));
        markers.length = 0;
        combinedCenters.forEach(location => {
            if (location.centerName.toLowerCase().includes(searchInput)) {
                const markerPosition = new kakao.maps.LatLng(location.lat, location.lot);
                const marker = new kakao.maps.Marker({
                    position: markerPosition,
                    map: map,
                    title: location.centerName
                });
                markers.push(marker);
                kakao.maps.event.addListener(marker, 'click', function () {
                    displayInfowindow(marker, location); // 인포윈도우 표시 함수 호출
                });
            }
        });

    // 기존 마커 제거
    deleteMarkers();
    // 새로운 마커들을 전역 변수 markers에 저장
    window.markers = markers;
    }

    function deleteMarkers() { // 기존 마커 제거 함수
        if (window.markers) {
            window.markers.forEach(marker => {
                marker.setMap(null);
            });
            window.markers = [];
        }
    }

    function displayInfowindow(marker, location) {
        let content = '<div style="padding:5px;">' +
            '<strong>' + location.centerName + '</strong><br>' +
            '<a href="./3/' + location.centerName + '" target="_blank">상담사 찾기</a>' +
            '</div>';
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }

    window.searchLocation = searchLocation;
    window.initMap = initMap;
});

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchLocation();
    }
});