import React ,{Component} from "react";
import CardList from '../contrainers/CardList';
import Search from '../contrainers/Search';
import Scroll from '../contrainers/Scroll';
import '../components/App.css';
import ErrorBoundry from "../contrainers/ErrorBoundry";


class App extends Component{
    constructor(){
        super()
        this.state={
            robots:[],
            searchfield:''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(reponse=> reponse.json())
        .then(users=>this.setState({robots: users}));
        
    }


    onsearchchange = (event) => {
        this.setState({ searchfield: event.target.value})
       
    }


    render() {
        const {robots , searchfield}= this.state;
        const filteredRobots=robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if(robots.length===0)
        {
            return <h1>Loading..!</h1>
        }
        else{
            return (
                <div className='tc'>
                    <h1 className='f1'>Robo Friends</h1>
                    <Search searchChange={this.onsearchchange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
        
    }
}

export default App;