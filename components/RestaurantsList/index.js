import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

// nafe
const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);
  // console.log(data);

  if (error) return "レストランの読み込みに失敗しました";

  if (loading) return <h2>ロード中・・・</h2>;

  // レストランデータが取得できたらカードを表示
  if (data) {
    // 検索された文字列でfilterする
    const searchQuery = data.restaurants.filter((res) =>
      res.name.toLowerCase().includes(props.search)
    );

    return (
      <Row>
        {searchQuery.map((restaurant) => (
          <Col xs="6" sm="4" key={restaurant.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${restaurant.image[0].url}`}
                top={true}
                sytle={{ height: 250 }}
              />
              <CardBody>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardTitle>{restaurant.description}</CardTitle>
              </CardBody>
              <div className="card-footer">
                <Link
                  href={`restaurants?id=${restaurant.id}`}
                  as={`restaurants/${restaurant.id}`}
                >
                  <a className="btn btn-primary">もっとみる</a>
                </Link>
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
      </Row>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default RestaurantList;
