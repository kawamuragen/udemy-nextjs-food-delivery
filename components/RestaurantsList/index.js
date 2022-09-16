import { Row, Col, Card, CardImg, CardBody, CardTitle } from "reactstrap";
import Link from "next/link";
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
const RestaurantList = () => {
  const { loading, error, data } = useQuery(query);
  // console.log(data);
  if (loading) return <h2>ロード中・・・</h2>;

  if (data.restaurants && data.restaurants.length) {
    return (
      <Row>
        <Col xs="6" sm="4">
          <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
            <CardImg
              src="http://localhost:1337/uploads/thumbnail_restaurant1_78f6738a9c.jpg"
              top={true}
              sytle={{ height: 250 }}
            />
            <CardBody>
              <CardTitle>Italian restaurant</CardTitle>
              <CardTitle>イタリアンのレストランです。</CardTitle>
            </CardBody>
            <div className="card-footer">
              <Link href="/restaurants?id=1" as="/restaurants/1">
                <a className="btn btn-primary">もっとみる</a>
              </Link>
            </div>
          </Card>
        </Col>
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
