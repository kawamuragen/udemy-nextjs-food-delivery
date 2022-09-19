import React from "react";
import App from "next/app";
import Head from "next/head";

import AppContext from "../context/AppContext";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import Cookies from "js-cookie";

class MyApp extends App {
  // クラスコンポーネントのため下一行に相当するものをクラス形式で書く
  // const [state, setState] = useState(null);
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({ user });
  };

  // 本当はuseEffectを使用したい
  // すでにユーザーのクッキー情報が残っているかを確認する。
  componentDidMount() {
    const token = Cookies.get("token"); //tokenの中にjwtが入っている
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookies.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user); //ログインと同等
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{ user: this.state.user, setUser: this.setUser }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

// すべてのコンポーネントでGraphQLを使えるようにする。
export default withData(MyApp);
