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
        <header>
            <nav>
                <ul className={'flex gap-4'}>
                    {
                        ul.map(item=> <li key={item.link}><Link to={item.link}>{item.label}</Link></li>)
                    }

                </ul>
            </nav>
        </header>
    );
}

export default Navbar;