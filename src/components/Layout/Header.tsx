import styles from "../../utils/style";
import NavItems from "../NavItems";
import ProfileDropdown from "../ProfileDropdown";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-800">
        <div className="w-[90%]  h-[80px] m-auto flex items-center justify-between">
            <h1 className={`${styles.logo}`}>
                Culinary Tom
            </h1>
            <NavItems />
            <ProfileDropdown />
        </div>
    </header>
  );
};

export default Header;
