import Link from "next/link";

const navItems = [
  {
    id: 0,
    title: "Home",
    url: "/",
  },
  {
    id: 1,
    title: "About us",
    url: "/about",
  },
  {
    id: 2,
    title: "Restaurants",
    url: "/restaurants",
  },
  {
    id: 3,
    title: "Popular Foods",
    url: "/foods",
  },
  {
    id: 4,
    title: "Contact us",
    url: "/contact",
  },
];

const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
  return (
    <div>
      {navItems.map((item, id) => (
        <Link
          key={item.id}
          href={item.url}
          className={`px-5 text-[18px] font-Poppins font-[500] ${
            activeItem === id && "text-emerald-500"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
