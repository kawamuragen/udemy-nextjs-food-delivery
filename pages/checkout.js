import { Col, Row } from "reactstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Cart from "../components/Cart";
import CheckOutForm from "../components/Checkout/CheckOutForm";

const checkout = () => {
  // loadStripe @stripe/stripe-js が必要
  // 公開キーを設定する
  // <Elements>にstripeのpropsとして渡す
  const stripePromise = loadStripe(
    "pk_test_51LlOBTFuj5CHTwb2fx4HoVhhkQz5C8oNxLheBB6oTxSHu9u4BFoSU8u4qHr8aK1zkDmKS2q1XpAd5gw16lcCbtTn00G9bm8Rv5"
  );

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20, fontSize: 20, textAlign: "center" }}>
          チェックアウト
        </h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </Col>
    </Row>
  );
};

export default checkout;
