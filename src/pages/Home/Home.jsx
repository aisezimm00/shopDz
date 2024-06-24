import { useSelector } from "react-redux";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import './style.css'
const Home = () => {
    const categories = useSelector( store => store.reducer.categories);
    return (
        <div>
            <h1 className="home">Home</h1>
        {
            categories.map(item =>{
                return <CategoryComponent key={item} category={item} limit={3} />
            })
        }
        </div>
    );
}

export default Home;