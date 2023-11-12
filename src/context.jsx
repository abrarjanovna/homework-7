import { createContext, useContext, useEffect, useState } from "react";
import Loading from "./Loading";

const url = "https://course-api.com/react-tours-project";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  if (loading)
    return (
      <main>
        <Loading />
      </main>
    );

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <div className="underline"></div>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        tours,
        setTours,
        readMore,
        setReadMore,
        removeTour,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
