import React, { useState, useEffect } from "react";

const LifecycleComponentFunctional = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [evenCount, setEvenCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    console.log(
      "Компонент обновлен. Текущее значение count:",
      evenCount,
      "function"
    );
  }, [evenCount]);
  useEffect(() => {
    const userPass = {
      email: "vovan1999@mail.ru",
      password: "Qwerty1988)"
    };

    const fetchData = async () => {
      const token = await login(userPass);
      if (token) {
        await getTasks(token);
      }
    };

    fetchData();
    console.log("Компонент был монтирован", "Functional");
    return () => {
      console.log("Компонент будет удалён.", "Functional");
    };
  }, []);

  useEffect(() => {
    if (count % 2 === 0) {
      setEvenCount(count);
    }
  }, [count]);

  const login = async (regUser) => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(regUser)
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при входе", "function");
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const getTasks = async (token) => {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении задач", "function");
      }

      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log("Ошибка", error, "function");
    }
  };

  return (
    <div>
      <h3>Функциональный компонент</h3>
      <p>Количество: {evenCount}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};

export default LifecycleComponentFunctional;
