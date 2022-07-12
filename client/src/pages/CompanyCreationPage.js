import React, {useContext, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import {Context} from "../index";
import {createCompany, uploadLogo} from "../http/companyAPI";
import {useNavigate} from "react-router-dom";
import {COMPANY_ROUTE} from "../utils/const";
import {uploadImg} from "../http/userAPI";

const CompanyCreationPage = () => {
    const {userStorage} = useContext(Context)
    const {companyStorage} = useContext(Context)
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')
    const [country, setCountry] = useState('')
    const [employeesNumber, setEmployeesNumber] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)

     async function createCompanySubmit() {
        try {



            const data = {
                name: name,
                website: website,
                country: country,
                employeesNumber: employeesNumber,
                owner: userStorage.user
            }
            const res = await createCompany(data)

            if(selectedFile){
                const fileData = new FormData()
                fileData.append('avatar', selectedFile)
                fileData.append('companyName', data.name)
                uploadLogo(fileData).then( data =>{
                    // setCurrentAvatarPath(process.env.REACT_APP_API_URL + data.file.path)
                })
            }

            console.log("Company created: ", res.status)
            // console.log("Company created: ", res.data)
            companyStorage.addMyCompany(res.data)

            userStorage.updateUserStorage = Date.now()
            // userStorage.user.companies
            console.log("cc", companyStorage.myCompanies.slice(-1)._id)
            navigate(COMPANY_ROUTE + '/' + res.data.url)
        } catch (e){
            // console.log("Не удалось создать компанию", e.response.data.message)
            console.log("Не удалось создать компанию", e)
        }
    }

    return (
        <div className="container mt-2">
            <h1>Создание компании</h1>
            <Form className="mt-3">

                <Form.Group className="mb-3">
                    <Form.Label>Название компании</Form.Label>
                    <Form.Control required placeholder=""
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Unique name go go go
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Large file input example</Form.Label>
                    <Form.Control type="file" size="sm" onChange={e=> setSelectedFile(e.target.files[0])} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Веб-сайт компании</Form.Label>
                    <Form.Control required
                        value={website}
                        onChange={e => setWebsite(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Страна</Form.Label>
                    <Form.Control required
                        value={country}
                        onChange={e => setCountry(e.target.value)}/>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Количество работников</Form.Label>
                    <Form.Select aria-label="Default select example"
                         value={employeesNumber}
                         onChange={e => setEmployeesNumber(e.target.value)}>
                        <option>Open this select menu</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-100">51-100</option>
                        <option value="100-1000">100-1000</option>
                        <option value="1001+">1001+</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" onClick={createCompanySubmit}>
                    Дальше
                </Button>
            </Form>
        </div>
    )
}

export default CompanyCreationPage