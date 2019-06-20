/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import Goals from '../src/components/goals';
import Slogan from '../src/components/slogan';
import Mission from '../src/components/mission';
import SuccessStories from '../src/components/SuccessStories';
import Footer from '../src/components/footer';
import '../node_modules/@fortawesome/fontawesome-free/js/all';
import '../sass/index.scss';

import {withRouter} from 'next/router';

// import Fetch from 'isomorphic-unfetch';
function App() {
  // basic useState hook
  // const [test, setTest] = useState('Hello'); // getter, setter = defaultValue

  // effect (apis, asynchronous stuff, etc.)
  // useEffect(() => {
  //   setTimeout(()=> setTest('Goodbye'), 5000);
  // });

  // initial render
  return (
    <div>
      <Slogan />
      <Mission />
      <Goals />
      <SuccessStories />
      <Footer />
    </div>
  );
}

export default withRouter(App);
