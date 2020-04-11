export const convertIcon = (icon) => {
    let icons = {
        "clear-day": "wi-day-sunny",
        "partly-cloudy-day": "wi-day-sunny-overcast",
        "clear-night": "wi-night-clear",
        "partly-cloudy-night": "wi-night-alt-partly-cloudy",
        "cloudy": "wi-cloudy",
        "rain": "wi-rain"
    }
    return icons[icon] || "wi-" + icon;
};