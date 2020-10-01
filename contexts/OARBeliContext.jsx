import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const OARBeliContext = createContext();
export function OARBeliContextProvider({ children }) {
  const [oarbelis, setOarbelis] = useState({});

  const getEditOarbeli = (entryId) => {
    if (entryId === null) { return Promise.resolve(); }

    return new Promise((resolve) => {
      const editEntry = oarbelis[entryId];
      editEntry.date = moment(editEntry.date);

      resolve(editEntry);
    });
  };

  const getAllOarbeli = async () => {
    await fetch(
      'http://sawit-express.herokuapp.com/api/OARBeli/collection',
      // "http://localhost:5000/api/OARBeli/collection"
    )
      .then((response) => response.json())
      .then((array) => {
        const newOarbeli = {};

        array.forEach((element) => {
          newOarbeli[element._id] = { ...element, key: element._id, date: moment(element.date) };
        });

        setOarbelis(newOarbeli);
      });
  };

  const postAddOarbeli = async (values) => {
    const init = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(
      'http://sawit-express.herokuapp.com/api/OARBeli/collection/create',
      init,
    )
      .then((response) => response.json())
      .then((addedOarbeli) => {
        setOarbelis({ ...oarbelis, [addedOarbeli._id]: addedOarbeli });
      });
  };

  const putEditOarbeli = async (values) => {
    const init = {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await fetch(
      `http://sawit-express.herokuapp.com/api/OARBeli/collection/edit/${values.id}`,
      init,
    );
  };

  const deleteOarbeli = async (id) => {
    const init = { method: 'DELETE' };

    await fetch(
      `http://sawit-express.herokuapp.com/api/OARBeli/collection/delete/${id}`,
      init,
    )
      .then(() => {
        getAllOarbeli();
      });
  };

  useEffect(() => getAllOarbeli, []);

  return (
    <OARBeliContext.Provider value={{
      oarbelis,
      setOarbeliArray: setOarbelis,
      getEditOarbeli,
      postAddOarbeli,
      putEditOarbeli,
      deleteOarbeli,
      getAllOarbeli,
    }}
    >
      {children}
    </OARBeliContext.Provider>
  );
}

OARBeliContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
