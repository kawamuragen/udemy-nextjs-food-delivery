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
    cart: { items: [], total: 0 },
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

  // カートへ商品の追加
  addItem = (item) => {
    let { items } = this.state.cart;
    const newItem = items.find((i) => i.id === item.id);
    console.log("_app.js addItem(item) newItem:");
    console.log(newItem);

    // 新しい商品追加の場合
    if (!newItem) {
      item.quantity = 1;
      // cartに追加する
      this.setState(
        {
          cart: {
            items: [...items, item],
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
    // すでにカートに商品入ってる場合
    else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              // itemオブジェクトに対してquantityフィールドを追加する
              // Object.assign 既存の配列に対して何かフィールドを追加したいときなど
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          cart: this.state.cart,
          setUser: this.setUser,
          addItem: this.addItem,
        }}
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
