import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { StorageService } from "../../services/storage/storage.service";
import { UserDTO, UsersService } from "../../services/users/user.service";
import Loader from "../atoms/loader/loader.atom";
import useAuthenticatedContext from "../../hooks/useAuthenticatedContext/useAuthenticatedContext.hook";

const PrivateZone = (): JSX.Element => {
  const [state, setState] = useState<UserDTO | undefined>(undefined);

  useAuthenticatedContext();

  useEffect(() => {
    const token = StorageService.getItem(
      process.env["REACT_APP_BASE_TOKEN_KEY"] as string
    );
    if (token) {
      const { id } = jwtDecode<{ id: string }>(token);
      setTimeout(async () => {
        try {
          setState(await UsersService.instance.getById(id));
        } catch (error: any) {
          alert(error.response.data.message);
        }
      }, 1000);
    }
  }, []);

  return !state ? (
    <Loader />
  ) : (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Card className="mt-5">
        <Card.Header className="text-center">
          <h2>User details</h2>
        </Card.Header>
        <Card.Body>
          <h5 className="card-title">Personal information</h5>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Email:</strong> {state.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Birth Date:</strong>{" "}
              {new Date(state.birthDate).toLocaleDateString()}
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              <strong>Age:</strong> {state.age}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PrivateZone;
