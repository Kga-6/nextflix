// context
import AppProvider from './context/AppContext';

// components
import Header from './components/header/Header';
import Editor from './components/editor/Editor';
import Frame from './components/frame/Frame';
import Bookmark from './components/bookmark/Bookmark';

// container
import Titles from './container/titles/Titles';

function App() {

  return (
    <AppProvider>
      
      <Header></Header>
      <Editor></Editor>
      <Titles></Titles>

      {/* 
        These compoents are visible depending on their states 
        (located inside of AppContext.js) 
      */}

      <Bookmark/>
      <Frame/>

    </AppProvider>
  );
}

export default App;
