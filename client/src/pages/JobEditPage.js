import React, {useContext, useEffect, useState} from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {Context} from "../index";
import {editAndSaveJob} from "../http/jobAPI";
import {useLocation, useNavigate} from "react-router-dom";
import {COMPANY_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import SkillsTypeAhead from "../components/utils/SkillsTypeAhead";
import {getAllSkills} from "../http/skillAPI";

const JobEditPage = observer(() => {
    const {state} = useLocation();
    const {userStorage} = useContext(Context)
    const navigate = useNavigate()

    const [position, setPosition] = useState(state.position || '')
    const [location, setLocation] = useState(state.location || '')
    const [employmentType, setEmploymentType] = useState(state.employmentType || '')
    const [remoteJob, setRemoteJob] = useState(state.remoteJob || '')
    const [experience, setExperience] = useState(state.experience || '')
    const [qualification, setQualification] = useState(state.qualification || '')
    const [requiredSkills, setRequiredSkills] = useState(state.requiredSkills || '')
    const [salaryMin, setSalaryMin] = useState(state.salaryMin || '')
    const [salaryMax, setSalaryMax] = useState(state.salaryMax || '')
    const [shareMin, setShareMin] = useState(state.shareMin || '')
    const [shareMax, setShareMax] = useState(state.shareMax || '')
    const [currency, setCurrency] = useState(state.currency || '')
    const [description, setDescription] = useState(state.description || '')
    const [companyAffiliation, setCompanyAffiliation] = useState(state.companyAffiliation)
    const [radioVariant, setRadioVariant] = useState(1)

    useEffect(() => {
        if (salaryMin || salaryMax){
            if (shareMin ||  shareMax)
                setRadioVariant(3)
            else
                setRadioVariant(1)
        }
        else if(shareMin || shareMax)
            setRadioVariant(2)
    },[])

    async function editCompanySubmit() {
            try {
                const data = {
                    position: position,
                    location: location,
                    employmentType: employmentType,
                    remoteJob: remoteJob,
                    experience: experience,
                    qualification: qualification,
                    requiredSkills: requiredSkills,
                    salaryMin: salaryMin,
                    salaryMax: salaryMax,
                    shareMin: shareMin,
                    shareMax: shareMax,
                    currency: currency,
                    description: description,
                    companyAffiliation: companyAffiliation
                }
                const res = await editAndSaveJob(state._id, data)

                console.log("Job edited: ", res)
                userStorage.updateUserStorage = Date.now()
                setValidated(true);
                navigate(COMPANY_ROUTE + '/' + companyAffiliation.url)

            } catch (e) {
                console.log("Не удалось создать компанию", e)
            }


    }

    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            editCompanySubmit().then()
        }
        setValidated(true)
    }

    function renderSalaryOrShare(val) {
        switch (val) {
            case 1:
                return <div>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Валюта
                        </Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="Рубль (₽)"
                                name="currencyRadio"
                                id="currencyRadio1"
                                onChange={e => setCurrency('₽')}
                            />
                            <Form.Check
                                type="radio"
                                label="Доллар ($)"
                                name="currencyRadio"
                                id="currencyRadio2"
                                onChange={e => setCurrency('$')}

                            />
                        </Col>
                    </Form.Group>

                    <Row xs='auto'>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>От</Form.Label>
                                <Form.Control value={salaryMin}
                                              onChange={e => setSalaryMin(e.target.value)}
                                              type="number"
                                              min={0}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>До</Form.Label>
                                <Form.Control value={salaryMax}
                                              onChange={e => setSalaryMax(e.target.value)}
                                              type="number"
                                              min={salaryMin}

                                />
                            </Form.Group>
                        </Col>

                    </Row>
                </div>
            case 2:
                return <div>
                    <div className="my-2"> Доля (%)</div>
                    <Row xs='auto'>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>От</Form.Label>
                                <Form.Control value={shareMin}
                                              onChange={e => setShareMin(e.target.value)}
                                              type="number"
                                              min={0}
                                              max={100}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>До</Form.Label>
                                <Form.Control value={shareMax}
                                              onChange={e => setShareMax(e.target.value)}
                                              type="number"
                                              min={shareMin || 0}
                                              max={100}
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                </div>
            case 3:
                return <div className="my-2">
                    <div>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Валюта
                            </Form.Label>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="Рубль (₽)"
                                    name="currencyRadio_Share"
                                    id="currencyRadio_Share1"
                                    onChange={e => setCurrency('₽')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Доллар ($)"
                                    name="currencyRadio_Share"
                                    id="currencyRadio_Share2"
                                    onChange={e => setCurrency('$')}

                                />
                            </Col>
                        </Form.Group>
                        <div className="my-2">Зарплата</div>
                        <Row xs='auto'>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>От</Form.Label>
                                    <Form.Control value={salaryMin}
                                                  onChange={e => setSalaryMin(e.target.value)}
                                                  type="number"
                                                  min={0}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>До</Form.Label>
                                    <Form.Control value={salaryMax}
                                                  onChange={e => setSalaryMax(e.target.value)}
                                                  type="number"
                                                  min={salaryMin}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                    </div>
                    <div className="my-2">Доля (%)</div>
                    <Row xs='auto'>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>От</Form.Label>
                                <Form.Control value={shareMin}
                                              onChange={e => setShareMin(e.target.value)}
                                              type="number"
                                              min={0}
                                              max={100}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>До</Form.Label>
                                <Form.Control value={shareMax}
                                              onChange={e => setShareMax(e.target.value)}
                                              type="number"
                                              min={shareMin || 0}
                                              max={100}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            default: return <div>Error</div>
        }
    }


    return (
        <div className="container mt-2">
            <h1>Создание вакансии</h1>

            <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>

                {/*---------------- ДОЛЖНОСТЬ ----------------*/}

                <Form.Group className="mb-3">
                    <Form.Label>Должность</Form.Label>
                    <Form.Control required
                                  value={position}
                                  onChange={e => setPosition(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Заполните это поле
                    </Form.Control.Feedback>
                </Form.Group>

                {/*---------------- МЕСТОПОЛОЖЕНИЕ ----------------*/}

                <Form.Group className="mb-3">
                    <Form.Label>Местоположение</Form.Label>
                    <Form.Control required
                                  value={location}
                                  onChange={e => setLocation(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Заполните это поле
                    </Form.Control.Feedback>
                </Form.Group>

                {/*---------------- УДАЛЕНКА? ----------------*/}

                <Form.Group className="mb-3">
                    <Form.Label>Удаленная работа</Form.Label>
                    <Form.Select aria-label="Default select example"
                                 value={remoteJob}
                                 onChange={e => setRemoteJob(e.target.value)}
                                required
                    >
                        <option value='' disabled>Open this select menu</option>
                        <option value="В офисе">В офисе</option>
                        <option value="Возможно удаленно">Возможно удаленно</option>
                        <option value="Полностью удаленно">Полностью удаленно</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Заполните это поле
                    </Form.Control.Feedback>
                </Form.Group>

                {/*---------------- ОПЫТ РАБОТЫ ----------------*/}

                <Form.Group className="mb-3">
                    <Form.Label>Опыт работы</Form.Label>
                    <Form.Select aria-label="Default select example"
                                 value={experience}
                                 onChange={e => setExperience(e.target.value)}>
                        <option>Возможно без опыта</option>
                        <option value="от 1 года">от 1 года</option>
                        <option value="от 2 лет">от 2 лет</option>
                        <option value="от 3 лет">от 3 лет</option>
                        <option value="от 4+ лет">от 4+ лет</option>
                    </Form.Select>
                </Form.Group>

                {/*---------------- КВАЛИФИКАЦИЯ ----------------*/}

                <Form.Group className="mb-3">
                    <Form.Label>Квалификация</Form.Label>
                    <Form.Select aria-label="Default select example"
                                 value={qualification}
                                 onChange={e => setQualification(e.target.value)}>
                        <option value={null}>Любая</option>
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Middle">Middle</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                    </Form.Select>
                </Form.Group>

                {/*---------------- НАВЫКИ ----------------*/}


                <SkillsTypeAhead data={setRequiredSkills} reqSkills={requiredSkills} />


                {/*---------------- ТИП ЗАНЯТОСТИ ----------------*/}


                <Form.Group className="mb-3">
                    <Form.Label>Тип занятости</Form.Label>
                    <Form.Select aria-label="Default select example"
                                 value={employmentType}
                                 onChange={e => setEmploymentType(e.target.value)}>
                        <option value="Полный рабочий день">Полный рабочий день</option>
                        <option value="Неполный рабочий день">Неполный рабочий день</option>
                        <option value="Стажировка">Стажировка</option>
                        <option value="Контракт">Контракт</option>
                        <option value="Сооснователь">Сооснователь</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Заполните это поле
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        Способ оплаты
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Зарплата"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            value={1}
                            onChange={e => setRadioVariant(1)}

                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Доля"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            value={2}
                            onChange={e => setRadioVariant(2)}

                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Зарплата + доля"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            onChange={e => setRadioVariant(3)}
                        />
                    </Col>
                    {renderSalaryOrShare(radioVariant)}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Описание должности</Form.Label>
                    <Form.Control as="textarea" rows={3} value={description}
                                  onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Компания</Form.Label>
                    <Form.Select disabled aria-label="Default select example"
                                 value={companyAffiliation}
                                 onChange={e => {
                                     console.log(e.target)
                                     setCompanyAffiliation(e.target.value)

                                 }}>
                        <option value={state._id} key={state.url}>{state.name}</option>

                        {/*{companyStorage.myCompanies.map(company =>*/}
                        {/*    <option value={company._id} key={company.url}>{company.name}</option>*/}
                        {/*)}*/}

                    </Form.Select>
                </Form.Group>

                {/*<Button variant="primary" className="my-2" type="submit" onSubmit={handleSubmit}>*/}
                {/*    Дальше*/}
                {/*</Button>*/}
                <Button className='button-green' type="submit" onSubmit={handleSubmit}>Save</Button>
            </Form>
        </div>
    )
})

export default JobEditPage