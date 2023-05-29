import Connection from './component/Connection';
import Publisher from './component/Publisher';
import Render from './component/Render';
import Subscriber from './component/Subscriber';
import TopicList from './component/TopicList';

function App() {

  return (
    < div className="App" >

        <Connection />
        <TopicList />
        <Publisher />
        <Subscriber />

    </div >
  );
}

export default App;
