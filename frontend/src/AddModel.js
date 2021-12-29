import { useState, useEffect } from "react";
import {Button, Form, InputGroup, FormControl, Image } from "react-bootstrap";
import API from "./API";

const AddModel = ({ onAdd }) => {
    const [brand_name, setBrand] = useState("");
    const [model_name, setModel] = useState("");
    const [color, setColor] = useState("");
    const [jan_code, setJanCode] = useState("");
    const [image, setImage] = useState("");
    const [modelId, setModelId] = useState(null);
    const [models, setModels] = useState([]);
    const [errorMessage, setErrorMessage] =useState("");
    const [isShowingAlert, setShowingAlert] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        refreshModel();
    },[]);

    const refreshModel = () => {
        API.get("/")
        .then((res) => {
            setModels(res.data);
        })
        .catch(console.error);
    };
    
    const checkErrorMessage = () =>{
        if(!errorMessage){
            setBrand("");
            setModel("");
            setColor("");
            setJanCode("");
        }else{
            setShowingAlert(true);
            setTimeout(() => {
                setShowingAlert(false);
              }, 2000);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { brand_name, model_name, color, jan_code};
        API.post("/", item)
        .then(() => refreshModel())
        .catch(err => setErrorMessage(err.response.data.jan_code[0]));
        checkErrorMessage();
    };

    const onUpdate = (id) => {
        let item = { brand_name, model_name, color, jan_code };
        API.patch(`/${id}/`, item)
        .then((res) => refreshModel())
        .catch(err => setErrorMessage(err.response.data.jan_code[0]));
        checkErrorMessage();
    };

    const onDelete = (id) => {
        API.delete(`/${id}/`).then((res) => refreshModel());
    };
    function selectModel(id) {
        let item = models.filter((model) => model.id === id)[0];
        setBrand(item.brand_name)
        setModel(item.model_name)
        setColor(item.color)
        setJanCode(item.jan_code)
        setModelId(item.id)
    }
    // console.log(image)
    // console.log(models.filter(({model_name}) => model_name === "Xiaomi 11T 128GB SIM Free"));
    return (
        <div className="container mt-5">
        <div className="row">
                <div className="col-md-4">
                    <h3 className="float-left">Create a new Model</h3>
                    <Form onSubmit={onSubmit} className="mt-4">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Brand Name"
                                value={brand_name}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicGenre">
                            <Form.Label>Model Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Model"
                                value={model_name}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStarring">
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStarring">
                            <Form.Label>JAN Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter JAN Code"
                                value={jan_code}
                                onChange={(e) => setJanCode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Model Image</Form.Label>
                            <Form.Control 
                                type="file"
                                onChange={(e) => setImage(e.target.files[0]["name"])}
                            />
                        </Form.Group>
                    
                        <div className="float-right">
                            <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                            className="mx-2"
                            >
                            Save
                            </Button>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => onUpdate(modelId)}
                                className="mx-2"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                    {isShowingAlert &&
                        <div className={'mt-3 alert alert-success'} >
                            <strong>{errorMessage}</strong>
                        </div>
                    }

                </div>
                <div className="col-md-8 m">
                    <div>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Model or JAN Code"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Brand Name</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>JAN code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {models.filter((model)=>{
                                if (searchTerm === ""){
                                    return model
                                }else if(model.model_name.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return model
                                }
                                else if(model.jan_code.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return model
                                }
                            }).map((model,key)=>{
                                return(
                                    <tr key={model.jan_code}>
                                        <th scope="row"><Image src={model.image} thumbnail /></th>
                                        <td>{model.brand_name}</td>
                                        <td> {model.model_name}</td>
                                        <td>{model.color}</td>
                                        <td>{model.jan_code}</td>
                                        <td>
                                            <i
                                                className="fa fa-pencil-square text-primary d-inline"
                                                aria-hidden="true"
                                                onClick={() => selectModel(model.id)}
                                            ></i>
                                            <i
                                                className="fa fa-trash-o text-danger d-inline mx-3"
                                                aria-hidden="true"
                                                onClick={() => onDelete(model.id)}
                                            ></i>
                                        </td>
                                </tr>            
                                );
                            })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default AddModel;