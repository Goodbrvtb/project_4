import React from "react";

class LifecycleComponentMyExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, data: [], loading: true, error: null };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  async componentDidMount() {
    const userPass = {
      email: "vovan1999@mail.ru",
      password: "Qwerty1988)"
    };

    const token = await this.login(userPass);
    if (token) {
      await this.getTasks(token);
    }
    console.log("'Компонент был монтирован'", this.state.data, "Classes");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log(
        "Компонент обновлен. Текущее значение count:",
        this.state.count,
        "Classes"
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count % 2 === 0;
  }

  componentWillUnmount() {
    console.log("Компонент будет удалён.", "Classes");
  }
  async login(regUser) {
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
        throw new Error("Ошибка при входе");
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.log("error: ", error);
      this.setState({ error, loading: false });
    }
  }

  async getTasks(token) {
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
        throw new Error("Ошибка при получении задач", "Classes");
      }

      const data = await response.json();
      this.setState({ data: data, loading: false });
    } catch (error) {
      console.log("error: ", error);
      this.setState({ error, loading: false });
    }
  }

  render() {
    return (
      <div>
        <h3>Классовый компонент</h3>

        <div>
          <p>Количество: {this.state.count}</p>
          <button onClick={this.increment}>Добавить</button>
        </div>
      </div>
    );
  }
}

export default LifecycleComponentMyExample;
