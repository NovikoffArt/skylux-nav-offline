# SkyLux NAV — offline data / офлайн-карти

Public distribution of open map data for SkyLux NAV. This repository contains no application source, personal user data or server credentials.

## Download in the app / Завантаження в застосунку

Use **Offline maps → All Ukraine or a region → Download**. The app downloads the required parts, verifies checksums and installs the package. You do not need to extract archives or install another application. Only packages with verified published links are available in the app catalog.

Відкрийте **Офлайн-карти → Уся Україна або область → Завантажити**. Застосунок сам завантажить частини, перевірить цілісність і встановить комплект. Розпаковувати архіви вручну не потрібно.

Откройте **Карты офлайн → Вся Украина или область → Скачать**. Приложение само загрузит части, проверит целостность и установит комплект. Вручную распаковывать архивы не нужно.

## Publication status

This repository is being prepared. No country or regional release is published here yet. Creating this repository does not mean that a package is ready or tested on Android. Existing verified Vinnytsia and Kyiv packages remain available through the application catalog.

## Package format

Each versioned release will contain manifest.json and the archive parts listed in that manifest. The manifest records file sizes, SHA-256 hashes, dataset date, coverage bounds, address count, licenses and routing compatibility. Keep all parts in the same release. The application validates the manifest against its catalog before installation.

## Sources and attribution

- Map, addresses and road data: © OpenStreetMap contributors, [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). [Copyright and attribution](https://www.openstreetmap.org/copyright). Source extract: [Geofabrik Ukraine](https://download.geofabrik.de/europe/ukraine.html).
- Vector maps generated with Planetiler / OpenMapTiles. [OpenMapTiles](https://openmaptiles.org/). Natural Earth public-domain data and OSM water polygons/lake centerlines are used as described in each package NOTICE.
- Noto Sans glyphs: SIL Open Font License 1.1; full license is included in each package.
- BRouter road segments are OSM-derived; compatible engine/profile version is recorded in the manifest. Engine software is included in the app, not in this data repository.

Machine-readable derived map/address databases and license texts are included in each package. Publication does not grant rights to the SkyLux brand or application source.

## Coverage and use

Coverage depends on mapped source objects. Missing addresses and restrictions are not invented. Approximate settlement assignments must remain labelled. Offline routing in these packages is for car navigation; offline TRUCK is unavailable. Online truck routing and actual road signs require separate checks. Dataset dates are stated in manifests; a newly published release does not imply newly surveyed roads.
