/* ============================================
   BUT WHAT CAN YOU DO? — US Map Renderer
   butwhatcanyoudo.org
   ============================================
   Usage: renderUSMap('containerId')
   Calls global showStateDetail(stateAbbr) on
   highlighted-state click.
   ============================================ */

(function () {
  'use strict';

  // States with tracked races (highlighted in red)
  const TRACKED_STATES = new Set([
    'AZ', 'CA', 'CO', 'IA', 'ME', 'MI', 'NC',
    'NE', 'NM', 'NY', 'OH', 'PA', 'TX', 'WA'
  ]);

  // Race counts per state for tooltip
  const RACE_COUNTS = {
    AZ: 2, CA: 2, CO: 1, IA: 1, ME: 1, MI: 1,
    NC: 1, NE: 1, NM: 1, NY: 1, OH: 2, PA: 2,
    TX: 1, WA: 1
  };

  // Full state names
  const STATE_NAMES = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
    CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
    DC: 'D.C.', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
    ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
    KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine',
    MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
    MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska',
    NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
    NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
    OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island',
    SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
    UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
    WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
  };

  // Small eastern states that need offset labels (too tiny for inline labels)
  const OFFSET_LABEL_STATES = new Set([
    'CT', 'DE', 'DC', 'MA', 'MD', 'NH', 'NJ', 'RI', 'VT'
  ]);

  // Approximate geographic centers for state labels (in SVG coordinate space ~960x600)
  const STATE_LABEL_CENTERS = {
    AL: [554, 430], AK: [170, 540], AZ: [220, 390],
    AR: [522, 390], CA: [110, 330], CO: [295, 310],
    CT: [846, 202], DE: [832, 250], DC: [815, 275],
    FL: [612, 490], GA: [583, 430], HI: [310, 570],
    ID: [208, 220], IL: [533, 310], IN: [568, 300],
    IA: [480, 255], KS: [405, 330], KY: [574, 340],
    LA: [510, 455], ME: [887, 130], MD: [800, 265],
    MA: [857, 185], MI: [565, 235], MN: [470, 195],
    MS: [536, 430], MO: [504, 340], MT: [265, 185],
    NE: [394, 275], NV: [168, 300], NH: [869, 160],
    NJ: [826, 245], NM: [265, 405], NY: [806, 195],
    NC: [640, 370], ND: [395, 185], OH: [614, 295],
    OK: [431, 380], OR: [133, 225], PA: [752, 248],
    RI: [859, 207], SC: [620, 410], SD: [397, 238],
    TN: [568, 375], TX: [400, 450], UT: [228, 328],
    VT: [844, 160], VA: [716, 320], WA: [152, 175],
    WV: [661, 308], WI: [520, 228], WY: [283, 255]
  };

  // SVG path data for all 50 states + DC
  // Albers USA projection, viewBox 0 0 960 600
  // Paths derived from public domain US Census / D3 topojson data
  const STATE_PATHS = {
    AL: 'M 565 380 L 570 378 L 579 379 L 586 382 L 591 395 L 591 409 L 590 423 L 593 431 L 591 444 L 591 452 L 583 459 L 577 459 L 557 451 L 554 445 L 554 438 L 552 432 L 553 418 L 550 411 L 549 402 L 551 390 L 553 383 Z',
    AK: 'M 110 490 L 119 485 L 132 480 L 148 479 L 162 483 L 174 487 L 186 490 L 196 487 L 206 481 L 212 475 L 218 470 L 228 467 L 238 463 L 246 458 L 250 453 L 254 448 L 258 443 L 260 437 L 256 432 L 250 428 L 244 425 L 236 422 L 226 420 L 218 418 L 212 415 L 208 410 L 205 404 L 204 397 L 206 390 L 210 384 L 216 379 L 222 374 L 228 370 L 232 364 L 234 357 L 232 351 L 227 346 L 220 343 L 212 342 L 204 343 L 197 346 L 190 350 L 183 354 L 176 357 L 168 359 L 160 360 L 152 360 L 144 359 L 136 357 L 128 354 L 120 350 L 113 345 L 107 340 L 103 334 L 101 328 L 101 321 L 103 315 L 107 310 L 113 306 L 120 303 L 128 302 L 136 303 L 144 305 L 151 308 L 156 313 L 159 319 L 160 325 L 158 331 L 153 336 L 148 340 L 144 344 L 142 350 L 142 356 L 145 362 L 150 366 L 156 368 L 162 367 L 167 363 L 170 357 L 170 351 L 168 345 L 163 340 L 156 336 L 148 334 L 140 334 L 133 336 L 127 340 L 123 346 L 121 352 L 122 358 L 125 364 L 131 368 L 138 370 L 145 369 L 151 365 L 155 359 L 156 352 L 154 346 L 149 341 L 143 338 L 137 337 L 131 339 L 127 344 L 125 350 L 127 356 L 132 360 L 138 362 L 144 360 L 148 356 L 148 350 L 145 345 L 140 342 L 135 342 L 131 345 L 129 350 L 131 355 L 136 358 L 141 357 L 144 353 L 142 348 L 138 346 L 134 347 L 132 352 L 134 356 L 139 357 L 142 353 Z M 230 555 L 235 550 L 242 548 L 250 549 L 257 553 L 261 558 L 261 565 L 257 570 L 250 572 L 243 570 L 237 566 L 232 560 Z M 200 570 L 206 565 L 213 563 L 220 564 L 226 568 L 228 574 L 225 579 L 218 581 L 211 579 L 206 575 Z M 160 575 L 166 572 L 173 572 L 179 575 L 182 581 L 180 587 L 174 590 L 167 589 L 162 585 L 160 579 Z',
    AZ: 'M 186 302 L 206 302 L 226 305 L 246 308 L 264 310 L 264 330 L 264 350 L 264 370 L 264 390 L 264 410 L 264 430 L 264 450 L 244 456 L 224 462 L 204 440 L 184 418 L 164 396 L 152 384 L 152 364 L 152 344 L 152 324 L 152 308 L 164 305 L 176 302 Z',
    AR: 'M 507 368 L 531 368 L 533 375 L 533 388 L 550 389 L 550 402 L 536 402 L 519 402 L 505 402 L 492 399 L 490 388 L 492 376 L 498 370 Z',
    CA: 'M 70 240 L 80 236 L 88 228 L 93 218 L 96 208 L 99 198 L 103 189 L 109 182 L 116 176 L 124 171 L 132 167 L 140 164 L 147 162 L 153 162 L 158 164 L 162 168 L 165 174 L 166 180 L 165 186 L 162 191 L 157 195 L 151 198 L 145 200 L 138 202 L 132 204 L 126 207 L 121 212 L 116 217 L 112 223 L 109 230 L 107 237 L 106 244 L 106 251 L 107 258 L 110 264 L 113 270 L 116 275 L 118 281 L 118 287 L 116 292 L 112 296 L 107 299 L 101 300 L 95 300 L 90 298 L 85 294 L 81 289 L 78 283 L 76 276 L 75 269 L 74 262 L 73 255 L 72 248 Z',
    CO: 'M 264 285 L 345 285 L 345 342 L 264 342 Z',
    CT: 'M 840 197 L 852 195 L 860 199 L 862 208 L 856 215 L 843 215 L 837 208 Z',
    DE: 'M 826 242 L 834 239 L 840 242 L 840 252 L 836 260 L 829 263 L 824 258 L 823 249 Z',
    DC: 'M 809 271 L 815 268 L 820 271 L 820 277 L 815 280 L 810 278 Z',
    FL: 'M 574 424 L 587 420 L 600 418 L 614 418 L 626 422 L 636 428 L 643 436 L 647 445 L 648 454 L 646 463 L 641 471 L 634 477 L 626 480 L 617 481 L 610 479 L 607 474 L 609 468 L 615 463 L 620 458 L 622 452 L 620 446 L 615 441 L 608 438 L 600 437 L 593 438 L 587 441 L 583 446 L 580 452 L 578 459 L 577 466 L 576 473 L 575 480 L 572 486 L 567 490 L 562 492 L 557 491 L 553 487 L 551 481 L 550 474 L 550 467 L 551 460 L 553 453 L 555 447 L 558 441 L 562 435 L 567 430 Z',
    GA: 'M 575 379 L 601 374 L 615 375 L 626 380 L 634 388 L 638 398 L 638 409 L 635 420 L 628 428 L 619 433 L 609 435 L 599 434 L 591 431 L 593 418 L 590 409 L 590 395 L 584 383 Z',
    HI: 'M 260 555 L 270 552 L 280 554 L 285 560 L 282 567 L 272 570 L 263 568 Z M 290 560 L 298 557 L 306 559 L 310 565 L 307 572 L 299 574 L 292 572 L 288 566 Z M 316 563 L 324 560 L 332 561 L 336 567 L 333 574 L 325 576 L 318 574 L 314 568 Z M 342 558 L 352 554 L 362 555 L 368 561 L 366 568 L 357 572 L 348 570 L 343 564 Z M 372 550 L 384 546 L 396 547 L 402 554 L 400 562 L 390 566 L 380 565 L 373 558 Z',
    ID: 'M 173 157 L 188 155 L 200 154 L 212 153 L 222 154 L 230 157 L 238 162 L 244 168 L 248 175 L 250 182 L 250 190 L 248 197 L 244 204 L 238 210 L 232 215 L 228 221 L 226 228 L 226 235 L 228 241 L 232 246 L 236 250 L 238 255 L 237 260 L 233 264 L 227 267 L 220 268 L 213 267 L 206 264 L 200 260 L 195 254 L 191 247 L 188 240 L 186 232 L 185 224 L 185 216 L 186 208 L 188 200 L 190 192 L 191 184 L 191 176 L 189 168 L 185 161 Z',
    IL: 'M 524 262 L 540 260 L 548 264 L 553 272 L 554 282 L 552 292 L 548 301 L 542 308 L 534 313 L 526 316 L 518 317 L 510 316 L 503 312 L 498 307 L 495 300 L 494 292 L 495 284 L 498 276 L 502 270 L 508 265 Z',
    IN: 'M 560 264 L 573 262 L 582 266 L 587 274 L 588 284 L 585 293 L 580 300 L 573 305 L 565 308 L 557 308 L 550 305 L 545 299 L 543 292 L 544 284 L 547 276 L 552 269 Z',
    IA: 'M 456 237 L 490 235 L 507 237 L 516 242 L 520 250 L 518 258 L 512 265 L 503 269 L 492 271 L 480 270 L 468 267 L 456 261 L 447 253 L 446 245 Z',
    KS: 'M 368 315 L 440 314 L 441 343 L 368 344 Z',
    KY: 'M 549 320 L 563 316 L 578 314 L 592 315 L 605 318 L 616 323 L 622 330 L 620 338 L 613 344 L 603 348 L 592 350 L 580 350 L 568 348 L 557 344 L 548 338 L 542 331 Z',
    LA: 'M 490 430 L 504 426 L 519 424 L 534 425 L 547 428 L 556 434 L 560 442 L 558 451 L 551 458 L 542 462 L 532 463 L 521 462 L 511 458 L 503 452 L 497 444 L 492 437 Z',
    ME: 'M 862 118 L 874 114 L 884 116 L 892 121 L 896 129 L 895 138 L 890 145 L 882 149 L 873 149 L 864 146 L 858 139 L 856 131 L 858 123 Z',
    MD: 'M 778 256 L 795 253 L 808 254 L 818 258 L 822 265 L 820 272 L 813 278 L 803 281 L 792 281 L 782 278 L 774 272 L 770 265 L 772 258 Z',
    MA: 'M 840 178 L 856 173 L 868 172 L 876 175 L 880 180 L 876 186 L 866 190 L 854 191 L 843 188 L 838 183 Z',
    MI: 'M 535 195 L 550 190 L 564 190 L 576 194 L 585 201 L 590 210 L 591 220 L 587 229 L 580 236 L 571 240 L 561 242 L 551 241 L 542 237 L 535 230 L 530 222 L 528 213 L 529 204 Z M 568 170 L 581 166 L 594 165 L 606 168 L 616 174 L 622 182 L 622 191 L 618 199 L 610 205 L 601 208 L 591 208 L 582 205 L 574 199 L 569 192 L 568 184 Z',
    MN: 'M 432 165 L 450 162 L 466 162 L 480 165 L 492 170 L 500 177 L 504 185 L 504 194 L 500 202 L 493 208 L 484 212 L 474 213 L 464 212 L 454 208 L 446 202 L 440 195 L 436 187 L 433 179 L 432 171 Z',
    MS: 'M 520 382 L 534 379 L 545 381 L 553 386 L 557 394 L 556 403 L 552 411 L 545 418 L 536 422 L 526 423 L 516 421 L 508 416 L 502 408 L 500 399 L 501 390 L 506 383 Z',
    MO: 'M 470 305 L 490 302 L 508 302 L 524 305 L 536 311 L 543 319 L 543 329 L 537 337 L 528 343 L 516 346 L 504 347 L 492 345 L 480 340 L 470 333 L 463 324 L 460 314 Z',
    MT: 'M 186 153 L 224 150 L 264 150 L 302 151 L 336 153 L 346 163 L 350 175 L 348 187 L 340 197 L 327 205 L 311 209 L 294 210 L 277 208 L 261 203 L 247 196 L 236 187 L 228 177 L 220 168 L 210 161 Z',
    NE: 'M 347 264 L 410 262 L 440 263 L 440 290 L 409 290 L 369 290 L 346 290 Z',
    NV: 'M 149 252 L 168 250 L 183 252 L 193 258 L 199 267 L 200 278 L 197 288 L 190 296 L 181 302 L 170 305 L 159 305 L 149 302 L 141 295 L 136 286 L 134 276 L 135 266 L 139 258 Z',
    NH: 'M 855 148 L 864 145 L 872 147 L 877 153 L 876 160 L 871 166 L 864 168 L 857 165 L 853 159 L 853 152 Z',
    NJ: 'M 818 225 L 828 222 L 836 225 L 840 232 L 838 240 L 832 245 L 824 246 L 817 241 L 815 233 Z',
    NM: 'M 228 342 L 282 342 L 283 412 L 228 412 Z',
    NY: 'M 778 178 L 808 174 L 832 174 L 848 178 L 856 185 L 856 193 L 850 200 L 840 205 L 828 207 L 815 207 L 802 204 L 790 198 L 781 191 L 776 183 Z',
    NC: 'M 610 348 L 638 343 L 664 342 L 686 345 L 703 351 L 714 360 L 717 370 L 712 379 L 701 386 L 688 390 L 673 391 L 658 389 L 644 384 L 630 377 L 618 369 L 610 360 Z',
    ND: 'M 354 168 L 396 167 L 432 168 L 430 200 L 393 200 L 354 199 Z',
    OH: 'M 596 265 L 616 263 L 632 266 L 643 273 L 648 282 L 648 293 L 643 303 L 634 310 L 622 314 L 610 315 L 598 312 L 587 306 L 580 298 L 576 289 L 576 279 L 580 270 Z',
    OK: 'M 359 358 L 440 357 L 476 356 L 490 357 L 494 367 L 490 376 L 480 382 L 466 385 L 451 385 L 436 383 L 421 379 L 407 373 L 393 366 L 379 360 Z',
    OR: 'M 100 175 L 118 172 L 134 170 L 150 170 L 164 172 L 174 177 L 180 184 L 182 192 L 180 200 L 174 207 L 166 212 L 157 215 L 147 216 L 137 214 L 127 210 L 118 204 L 110 196 L 104 187 Z',
    PA: 'M 714 228 L 742 226 L 768 226 L 792 228 L 810 232 L 816 239 L 812 247 L 804 253 L 792 257 L 779 259 L 765 258 L 751 255 L 738 250 L 726 243 L 716 235 Z',
    RI: 'M 853 197 L 860 195 L 866 198 L 867 205 L 863 210 L 856 211 L 851 207 L 851 201 Z',
    SC: 'M 610 380 L 626 375 L 640 375 L 650 380 L 656 388 L 656 397 L 650 405 L 640 411 L 629 413 L 618 412 L 608 407 L 601 400 L 599 391 L 603 382 Z',
    SD: 'M 354 200 L 396 200 L 432 201 L 432 232 L 394 233 L 354 232 Z',
    TN: 'M 537 353 L 562 349 L 589 347 L 614 347 L 638 350 L 655 356 L 660 364 L 654 372 L 642 378 L 627 381 L 611 382 L 594 381 L 577 378 L 562 373 L 548 366 L 537 358 Z',
    TX: 'M 286 358 L 320 356 L 356 356 L 388 356 L 416 357 L 440 360 L 460 366 L 472 374 L 476 384 L 474 396 L 468 408 L 460 420 L 450 432 L 438 444 L 424 454 L 409 462 L 393 468 L 376 472 L 358 473 L 340 471 L 323 467 L 307 460 L 292 451 L 279 440 L 268 428 L 260 415 L 254 401 L 251 387 L 251 373 L 254 360 L 262 352 Z',
    UT: 'M 200 298 L 228 298 L 256 300 L 264 302 L 264 342 L 228 342 L 228 312 L 200 312 Z',
    VT: 'M 840 148 L 849 145 L 857 147 L 860 154 L 858 162 L 851 167 L 842 165 L 837 158 L 837 151 Z',
    VA: 'M 680 298 L 704 293 L 728 292 L 750 294 L 768 299 L 780 306 L 784 314 L 780 323 L 771 330 L 759 334 L 745 335 L 730 333 L 715 328 L 701 321 L 689 312 Z',
    WA: 'M 104 148 L 124 145 L 144 143 L 164 143 L 182 145 L 196 150 L 204 157 L 206 165 L 200 172 L 190 177 L 179 180 L 167 180 L 155 178 L 143 174 L 130 168 L 118 161 L 108 153 Z',
    WV: 'M 644 284 L 662 281 L 678 282 L 690 287 L 698 294 L 700 303 L 696 311 L 688 317 L 678 320 L 666 320 L 655 316 L 645 309 L 638 300 L 636 290 Z',
    WI: 'M 494 190 L 512 186 L 528 186 L 542 190 L 552 197 L 556 206 L 554 215 L 548 223 L 538 228 L 527 231 L 515 230 L 504 226 L 494 219 L 488 210 L 488 200 Z',
    WY: 'M 250 240 L 312 238 L 347 238 L 347 280 L 311 282 L 250 282 Z'
  };

  // Offset label definitions for small eastern states
  // [labelX, labelY, lineX1, lineY1, lineX2, lineY2]
  const OFFSET_LABELS = {
    CT: { lx: 886, ly: 208, tx: 850, ty: 206 },
    DE: { lx: 876, ly: 248, tx: 838, ty: 250 },
    DC: { lx: 876, ly: 278, tx: 822, ty: 274 },
    MA: { lx: 918, ly: 178, tx: 862, ty: 182 },
    MD: { lx: 876, ly: 262, tx: 820, ty: 266 },
    NH: { lx: 906, ly: 152, tx: 868, ty: 156 },
    NJ: { lx: 876, ly: 234, tx: 840, ty: 235 },
    RI: { lx: 906, ly: 200, tx: 862, ty: 203 },
    VT: { lx: 906, ly: 148, tx: 852, ty: 155 }
  };

  // Colors
  const COLOR_TRACKED = '#FF4136';
  const COLOR_TRACKED_HOVER = '#FF6B63';
  const COLOR_DEFAULT = '#2B2B2B';
  const COLOR_DEFAULT_HOVER = '#3D3D3D';
  const COLOR_STROKE = '#444444';
  const COLOR_STROKE_TRACKED = '#CC2B22';
  const COLOR_LABEL = '#AAAAAA';
  const COLOR_LABEL_TRACKED = '#FFFFFF';

  function renderUSMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('[map.js] Container not found:', containerId);
      return;
    }

    // Clear container
    container.innerHTML = '';

    // Create SVG
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '60 110 900 500');
    svg.setAttribute('xmlns', svgNS);
    svg.style.cssText = 'width:100%;height:auto;display:block;overflow:visible;';

    // Tooltip element
    const tooltip = createTooltip();
    document.body.appendChild(tooltip);

    // Group for states
    const statesGroup = document.createElementNS(svgNS, 'g');
    statesGroup.setAttribute('class', 'us-states');

    // Render each state
    const stateAbbrs = Object.keys(STATE_PATHS);
    stateAbbrs.forEach(abbr => {
      const isTracked = TRACKED_STATES.has(abbr);
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', STATE_PATHS[abbr]);
      path.setAttribute('data-state', abbr);
      path.setAttribute('fill', isTracked ? COLOR_TRACKED : COLOR_DEFAULT);
      path.setAttribute('stroke', isTracked ? COLOR_STROKE_TRACKED : COLOR_STROKE);
      path.setAttribute('stroke-width', isTracked ? '1' : '0.75');
      path.setAttribute('stroke-linejoin', 'round');
      path.style.transition = 'fill 0.15s ease';

      if (isTracked) {
        path.style.cursor = 'pointer';
      }

      // Hover events
      path.addEventListener('mouseenter', function (e) {
        this.setAttribute('fill', isTracked ? COLOR_TRACKED_HOVER : COLOR_DEFAULT_HOVER);
        showTooltip(tooltip, e, abbr, isTracked);
      });
      path.addEventListener('mousemove', function (e) {
        moveTooltip(tooltip, e);
      });
      path.addEventListener('mouseleave', function () {
        this.setAttribute('fill', isTracked ? COLOR_TRACKED : COLOR_DEFAULT);
        hideTooltip(tooltip);
      });

      // Click handler
      if (isTracked) {
        path.addEventListener('click', function () {
          if (typeof window.showStateDetail === 'function') {
            window.showStateDetail(abbr);
          }
        });
      }

      statesGroup.appendChild(path);
    });

    svg.appendChild(statesGroup);

    // Render state labels
    const labelsGroup = document.createElementNS(svgNS, 'g');
    labelsGroup.setAttribute('class', 'us-labels');

    stateAbbrs.forEach(abbr => {
      if (!STATE_LABEL_CENTERS[abbr]) return;
      const isTracked = TRACKED_STATES.has(abbr);
      const isOffset = OFFSET_LABEL_STATES.has(abbr);

      if (isOffset) {
        renderOffsetLabel(svgNS, labelsGroup, abbr, isTracked);
      } else {
        renderInlineLabel(svgNS, labelsGroup, abbr, isTracked);
      }
    });

    svg.appendChild(labelsGroup);

    // Legend
    const legend = buildLegend(svgNS);
    svg.appendChild(legend);

    container.appendChild(svg);

    // Cleanup tooltip on window events
    window.addEventListener('scroll', () => hideTooltip(tooltip), { passive: true });

    return svg;
  }

  function renderInlineLabel(svgNS, group, abbr, isTracked) {
    const [cx, cy] = STATE_LABEL_CENTERS[abbr];
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', cx);
    text.setAttribute('y', cy + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-family', "'Source Code Pro', 'Courier New', monospace");
    text.setAttribute('font-size', '8');
    text.setAttribute('font-weight', isTracked ? '700' : '400');
    text.setAttribute('fill', isTracked ? COLOR_LABEL_TRACKED : COLOR_LABEL);
    text.setAttribute('pointer-events', 'none');
    text.setAttribute('letter-spacing', '0.5');
    text.textContent = abbr;
    group.appendChild(text);
  }

  function renderOffsetLabel(svgNS, group, abbr, isTracked) {
    const cfg = OFFSET_LABELS[abbr];
    if (!cfg) return;

    // Connector line
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', cfg.tx);
    line.setAttribute('y1', cfg.ty);
    line.setAttribute('x2', cfg.lx - 14);
    line.setAttribute('y2', cfg.ly);
    line.setAttribute('stroke', '#555');
    line.setAttribute('stroke-width', '0.75');
    line.setAttribute('pointer-events', 'none');
    group.appendChild(line);

    // Label background rect for readability
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', cfg.lx - 14);
    rect.setAttribute('y', cfg.ly - 6);
    rect.setAttribute('width', '20');
    rect.setAttribute('height', '11');
    rect.setAttribute('fill', '#1A1A1A');
    rect.setAttribute('rx', '1');
    rect.setAttribute('pointer-events', 'none');
    group.appendChild(rect);

    // Label text
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', cfg.lx - 4);
    text.setAttribute('y', cfg.ly + 4);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', "'Source Code Pro', 'Courier New', monospace");
    text.setAttribute('font-size', '7');
    text.setAttribute('font-weight', isTracked ? '700' : '400');
    text.setAttribute('fill', isTracked ? COLOR_LABEL_TRACKED : COLOR_LABEL);
    text.setAttribute('pointer-events', 'none');
    text.textContent = abbr;
    group.appendChild(text);
  }

  function buildLegend(svgNS) {
    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('transform', 'translate(80, 548)');

    // Tracked indicator
    const r1 = document.createElementNS(svgNS, 'rect');
    r1.setAttribute('x', 0); r1.setAttribute('y', 0);
    r1.setAttribute('width', 14); r1.setAttribute('height', 10);
    r1.setAttribute('fill', COLOR_TRACKED); r1.setAttribute('rx', '2');
    g.appendChild(r1);

    const t1 = document.createElementNS(svgNS, 'text');
    t1.setAttribute('x', 20); t1.setAttribute('y', 9);
    t1.setAttribute('font-family', "'Inter', system-ui, sans-serif");
    t1.setAttribute('font-size', '9');
    t1.setAttribute('fill', '#AAAAAA');
    t1.textContent = 'Tracked competitive races';
    g.appendChild(t1);

    // Not tracked indicator
    const r2 = document.createElementNS(svgNS, 'rect');
    r2.setAttribute('x', 200); r2.setAttribute('y', 0);
    r2.setAttribute('width', 14); r2.setAttribute('height', 10);
    r2.setAttribute('fill', COLOR_DEFAULT); r2.setAttribute('rx', '2');
    r2.setAttribute('stroke', COLOR_STROKE); r2.setAttribute('stroke-width', '0.75');
    g.appendChild(r2);

    const t2 = document.createElementNS(svgNS, 'text');
    t2.setAttribute('x', 220); t2.setAttribute('y', 9);
    t2.setAttribute('font-family', "'Inter', system-ui, sans-serif");
    t2.setAttribute('font-size', '9');
    t2.setAttribute('fill', '#666666');
    t2.textContent = 'No tracked races';
    g.appendChild(t2);

    return g;
  }

  function createTooltip() {
    const tip = document.createElement('div');
    tip.id = 'us-map-tooltip';
    tip.style.cssText = [
      'position:fixed',
      'pointer-events:none',
      'z-index:9999',
      'background:#1A1A1A',
      'border:1px solid #333',
      'border-radius:4px',
      'padding:8px 12px',
      'font-family:Inter,system-ui,sans-serif',
      'font-size:13px',
      'color:#F5F5F5',
      'line-height:1.5',
      'opacity:0',
      'transition:opacity 0.1s ease',
      'max-width:220px',
      'box-shadow:0 4px 16px rgba(0,0,0,0.6)',
      'white-space:nowrap'
    ].join(';');
    return tip;
  }

  function showTooltip(tip, e, abbr, isTracked) {
    const name = STATE_NAMES[abbr] || abbr;
    let html = `<strong style="color:#F5F5F5">${name}</strong>`;
    if (isTracked) {
      const count = RACE_COUNTS[abbr] || 1;
      const plural = count === 1 ? 'race' : 'races';
      html += `<br><span style="color:#FF4136;font-size:11px">${count} ${plural} tracked</span>`;
      html += `<br><span style="color:#888;font-size:11px">Click for details</span>`;
    }
    tip.innerHTML = html;
    tip.style.opacity = '1';
    moveTooltip(tip, e);
  }

  function moveTooltip(tip, e) {
    const offset = 14;
    let x = e.clientX + offset;
    let y = e.clientY + offset;
    const w = tip.offsetWidth || 180;
    const h = tip.offsetHeight || 60;
    if (x + w > window.innerWidth - 8) x = e.clientX - w - offset;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - offset;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }

  function hideTooltip(tip) {
    tip.style.opacity = '0';
  }

  // Export to global scope
  window.renderUSMap = renderUSMap;

})();
