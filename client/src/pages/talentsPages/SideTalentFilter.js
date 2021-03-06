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

            {/*---------------- ???????????????????????????? ----------------*/}

            <Form.Group className="mb-3 mt-3">
                <Form.Label>????????????</Form.Label>
                <Form.Control required
                              value={location}
                              onChange={e => setLocation(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                    ?????????????????? ?????? ????????
                </Form.Control.Feedback>
            </Form.Group>

            <hr/>


            {/*---------------- ???????? ???????????? ----------------*/}

            <Form.Group className="mb-3">
                <Form.Label>???????? ????????????</Form.Label>
                <Form.Select aria-label="Default select example"
                             value={experience}
                             onChange={e => setExperience(e.target.value)}>
                    <option value="any">??????????</option>
                    <option>???????????????? ?????? ??????????</option>
                    <option value="1">???? 1 ????????</option>
                    <option value="2">???? 2 ??????</option>
                    <option value="3">???? 3 ??????</option>
                    <option value="4">???? 4+ ??????</option>
                </Form.Select>
            </Form.Group>



            <hr/>

            {/*---------------- ???????????????? ----------------*/}

                {/*---------------- ???????????? + ???????? ----------------*/}
                <h5>????????????????????????????</h5>

            {/*---------------- ???????????? ----------------*/}
            <Form.Group className="mb-3">
                <Form.Label>????????????</Form.Label>
                <Form.Select aria-label="Default select example"
                             value={currency}
                             onChange={e => setCurrency(e.target.value)}>
                    <option value="any">??????????</option>
                    <option value="???">?????????? (???)</option>
                    <option value="$">???????????? ($)</option>
                    <option value="???">???????? (???)</option>
                </Form.Select>
            </Form.Group>
            {currency !== 'any' &&
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>???????????????? ???? {salaryMax} {currency}</Form.Label>
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
                <Button className='btn-yellow' onClick={() => clearFilter()}>????????????????</Button>
                <Button className='btn-green ms-2' onClick={() => applyFilter()}>??????????????????</Button>

            </div>


        </Container>
    )
})

export default SideTalentFilter