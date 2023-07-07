import { useEffect, useState } from 'react';
import NetflixCard from './components/NetflixCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function App() {
  const [myData, setMyData] = useState([]);

  const url =
    'https://netflix54.p.rapidapi.com/search/?query=stranger&offset=0&limit_titles=50&limit_suggestions=20&lang=en';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b32f2b1317msh6c4c66504343e6fp1c1bcfjsn3043093b8842',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com',
    },
  };

  const fetch_data = async () => {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setMyData(data.titles);
      console.log(data.titles.jawSummary);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch_data();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className='App'>
      <Carousel responsive={responsive}>
        {myData.map((cretitle) => {
          return (
            <>
              <NetflixCard key={cretitle.summary.id} actualData={cretitle} />
            </>
          );
        })}
      </Carousel>
      ;
    </div>
  );
}

export default App;
