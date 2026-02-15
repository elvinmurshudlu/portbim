import {Link} from "react-router";


const ul = [
    {
        label:"Designer",
        link:'/'
    },
    {
        label:'Models',
        link: '/models'
    }
]

function Navbar() {
    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-gray-950 mb-4">
            <nav className="mx-auto max-w-5xl px-6 py-6">
                <ul className="flex items-center gap-10">
                    {ul.map((item) => (
                        <li key={item.link}>
                            <Link
                                to={item.link}
                                className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;