import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// Prevent Font Awesome from dynamically adding CSS styles, which is not needed for server-side rendering
config.autoAddCss = false;

// Add all the icons to the library so you can use them throughout your app
library.add(fas, far, fab);
