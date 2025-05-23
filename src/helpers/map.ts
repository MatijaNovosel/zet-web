export function animateMarkerMove(marker: any, newLatLng: [number, number], duration = 8000) {
  const startLatLng = marker.getLatLng();
  const startTime = performance.now();

  function animate(time: number) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);

    const lat = startLatLng.lat + (newLatLng[0] - startLatLng.lat) * t;
    const lng = startLatLng.lng + (newLatLng[1] - startLatLng.lng) * t;

    marker.setLatLng([lat, lng]);

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
