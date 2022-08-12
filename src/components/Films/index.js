import { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

const Films = ({ url }) => {
  const [title, setTitle] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchFilms = async (url) => {
    const res = await axios.get(url);
    const results = await res.data;
    setIsloading(false);
    return results;
  };

  useEffect(() => {
    const showFilms = async (url) => {
      const fetchData = await fetchFilms(url);
      setTitle(fetchData.title);
    };
    showFilms(url);
  }, []);

  return (
    <>
      {isLoading ? (
        <RotatingLines
          strokeColor="lightblue"
          strokeWidth="5"
          animationDuration="0.75"
          width="22"
          visible={true}
        />
      ) : (
        <label> ({title}) </label>
      )}
    </>
  );
};

export default Films;
