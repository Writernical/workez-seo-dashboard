# WorkEZ — GPS Coordinate Corrections

Replace the `geo` block in each centre's LocalBusiness schema with the corrected values below.

| Centre | Old (lat, lng) | Corrected (lat, lng) | Drift |
|---|---|---|---|
| annasalai-hansa | 13.06292, 80.25683 | **13.060433, 80.256889** | 0.28 km |
| annasalai-clubhouse | 13.06263, 80.26417 | **13.061182, 80.264064** | 0.16 km |
| guindy-willow-square | 13.01091, 80.20906 | **13.010464, 80.209073** | 0.05 km |
| guindy-chambers | 13.01247, 80.20877 | **13.01215, 80.208739** | 0.04 km |
| perungudi-sm-towers | 13.01247, 80.20877 | **12.953716, 80.242003** | 7.46 km ⚠️ |
| omr-urban-square | 12.95391, 80.24205 | **12.973081, 80.250865** | 2.34 km ⚠️ |
| omr-the-ark | 12.90673, 80.22873 | **12.906496, 80.228672** | 0.03 km |
| pallavaram-the-address | 12.95247, 80.16298 | **12.952281, 80.162912** | 0.02 km |
| velachery-helix | 12.99166, 80.21902 | **12.99141, 80.219024** | 0.03 km |
| alwarpet-park-centre | 13.03031, 80.252 | **13.030116, 80.252066** | 0.02 km |
| bellandur | 12.93134, 77.68723 | **12.931127, 77.687287** | 0.02 km |
| saravanampatti | 11.07879, 77.00319 | **11.07857, 77.003213** | 0.02 km |

## New centres (no prior value)

| Centre | Coordinates (lat, lng) |
|---|---|
| velachery-one-national-park | 12.992820, 80.218013 |
| kakkanad-it-twin-towers | 10.012517, 76.372393 |

⚠️ = was off by more than 1 km. Note: perungudi-sm-towers was set to the exact same coordinate as guindy-chambers (pointing ~12 km to the wrong locality).