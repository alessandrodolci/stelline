export function deviceHasTouchScreen() {
    let hasTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    }
    else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    }

    return hasTouchScreen;
}
