import {
  faBowlRice,
  faBurger,
  faDrumstickBite,
  faIceCream,
  faPizzaSlice,
  faSpaghettiMonsterFlying,
  faTag,
  faTags,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoriesTag = [
  "all",
  "hamburger",
  "pizza",
  "noodles",
  "chicken",
  "rice",
  "drink",
  "combo",
  "multiCombo",
];

const CategoriesIcon = [
  <FontAwesomeIcon
    className="iconHover"
    key="all" // Add a unique key for each icon
    icon={faBowlFood}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="burger" // Add a unique key for each icon
    icon={faBurger}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="pizza"
    icon={faPizzaSlice}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="spaghetti"
    icon={faSpaghettiMonsterFlying}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="drumstick"
    icon={faDrumstickBite}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="rice"
    icon={faBowlRice}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="icecream"
    icon={faIceCream}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="tag"
    icon={faTag}
    style={{ fontSize: 24, color: "orange" }}
  />,
  <FontAwesomeIcon
    className="iconHover"
    key="tags"
    icon={faTags}
    style={{ fontSize: 24, color: "orange" }}
  />,
];

const CategoriesInfo = { CategoriesIcon, CategoriesTag };

export default CategoriesInfo;
