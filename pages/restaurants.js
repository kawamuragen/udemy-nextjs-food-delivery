import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { gql } from "apollo-boost";
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import AppContext from "../context/AppContext";
import Cart from "../components/Cart";

// どのレストラン情報を取るのか決めるために$idとする
// ID! は必須小目
const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

// nafe
const Restaurants = (props) => {
  const appContext = useContext(AppContext);

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    // router→useRouter()  query.id→「?id=xxxx」
    variables: { id: router.query.id },
  });
  // console.log(data);

  if (error) return "レストランの読み込みに失敗しました";

  if (loading) return <h2>ロード中・・・</h2>;

  // レストランデータが取得できたらカードを表示
  if (data) {
    const { restaurant } = data;

    return (
      <>
        <h1>{restaurant.name}</h1>
        <Row>
          {restaurant.dishes.map((dish) => (
            <Col xs="6" sm="4" key={dish.id} style={{ padding: 0 }}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${dish.image.url}`}
                  top={true}
                  sytle={{ height: 250 }}
                />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardTitle>{dish.description}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(dish)}
                  >
                    + カートに入れる
                  </Button>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              .card-colums {
                column-connt: 3;
              }
            `}
          </style>
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default Restaurants;
