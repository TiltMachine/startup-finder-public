import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import SkillsTypeAhead from "../../components/utils/SkillsTypeAhead";
import JobCard from "../../components/companies/jobComponents/JobCard";

const SideTalentFilter = observer((props) => {
    let talentList = props.talents
    const [location, setLocation] = useState('')
    const [experience, setExperience] = useState('any')
    const [requiredSkills, setRequiredSkills] = useState([])
    const [salaryMax, setSalaryMax] = useState('0')
    const [currency, setCurrency] = useState('any')

    const [clearInput, setClearInput] = useState(false)

    function applyFilter() {
        let filteredTalents = talentList
        if(location !== '')
            filteredTalents = filteredTalents.filter(locationFilter)
        if(experience !== 'any')
            filteredTalents = filteredTalents.filter(experienceFilter)
        if(requiredSkills.length !==0)
            filteredTalents = filteredTalents.filter(requiredSkillsFilter)
        if(currency !== 'any') {
            filteredTalents = filteredTalents.filter(currencyFilter)
            if (salaryMax !== '' && salaryMax !== '0')
                filteredTalents = filteredTalents.filter(salaryMinFilter)
        }
        // console.log(filteredTalents)
        props.filteredTalents(filteredTalents)
    }
    function locationFilter(job) {
        return job.country === location
    }
    function experienceFilter(job) {
        let exp = parseInt(experience, 10)
        return job.experienceYears >= exp
    }
    function requiredSkillsFilter(job) {
        for (let skill of requiredSkills) {
            if(!job.skills.some(el => el._id === skill._id))
                return false
        }
        return true
    }
    function currencyFilter(job) {
        return job.desiredCurrency === currency
    }
    function salaryMinFilter(job) {
        return  job.desiredSalary <= salaryMax
    }

    function clearFilter() {
        setLocation('')

        setExperience('any')
        setRequiredSkills([])
        setSalaryMax('0')
        setCurrency('any')

        setClearInput(!clearInput)
        props.filteredTalents(talentList)
    }

    return (
        <Container>

            <SkillsTypeAhead data={setRequiredSkills} clearInput={clearInput}/>

            <hr/>

            {/*---------------- МЕСТОПОЛОЖЕНИЕ ----------------*/}

            <Form.Group className="mb-3 mt-3">
                <Form.Label>Страна</Form.Label>
                <Form.Control required
                              value={location}
                              onChange={e => setLocation(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                    Заполните это поле
                </Form.Control.Feedback>
            </Form.Group>

            <hr/>


            {/*---------------- ОПЫТ РАБОТЫ ----------------*/}

            <Form.Group className="mb-3">
                <Form.Label>Опыт работы</Form.Label>
                <Form.Select aria-label="Default select example"
                             value={experience}
                             onChange={e => setExperience(e.target.value)}>
                    <option value="any">Любой</option>
                    <option>Возможно без опыта</option>
                    <option value="1">от 1 года</option>
                    <option value="2">от 2 лет</option>
                    <option value="3">от 3 лет</option>
                    <option value="4">от 4+ лет</option>
                </Form.Select>
            </Form.Group>



            <hr/>

            {/*---------------- ЗАРПЛАТА ----------------*/}

                {/*---------------- Деньги + Доля ----------------*/}
                <h5>Вознаграждение</h5>

            {/*---------------- валюта ----------------*/}
            <Form.Group className="mb-3">
                <Form.Label>Валюта</Form.Label>
                <Form.Select aria-label="Default select example"
                             value={currency}
                             onChange={e => setCurrency(e.target.value)}>
                    <option value="any">Любая</option>
                    <option value="₽">Рубль (₽)</option>
                    <option value="$">Доллар ($)</option>
                    <option value="€">Евро (€)</option>
                </Form.Select>
            </Form.Group>
            {currency !== 'any' &&
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Зарплата до {salaryMax} {currency}</Form.Label>
                        <Form.Control value={salaryMax}
                                      onChange={e => setSalaryMax(e.target.value)}
                                      type="number"
                                      min={0}
                        />
                    </Form.Group>
                </Col>
            </Row>
            }


            <div className="d-flex justify-content-end mb-3">
                <Button className='btn-yellow' onClick={() => clearFilter()}>Очистить</Button>
                <Button className='btn-green ms-2' onClick={() => applyFilter()}>Применить</Button>

            </div>


        </Container>
    )
})

export default SideTalentFilter