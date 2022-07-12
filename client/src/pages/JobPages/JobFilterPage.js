import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import SkillsTypeAhead from "../../components/utils/SkillsTypeAhead";
import JobCard from "../../components/companies/jobComponents/JobCard";
import {getFilteredJobs} from "../../http/jobAPI";

const JobFilterPage = observer((props) => {
    let jobList = props.jobs
    const [location, setLocation] = useState('')
    const [employmentType, setEmploymentType] = useState('any')
    const [remoteJob, setRemoteJob] = useState('any')
    const [experience, setExperience] = useState('any')
    const [qualification, setQualification] = useState('any')
    const [requiredSkills, setRequiredSkills] = useState([])
    const [salaryMin, setSalaryMin] = useState('0')
    const [shareMin, setShareMin] = useState('0')
    const [currency, setCurrency] = useState('any')

    const [clearInput, setClearInput] = useState(false)

    async function applyFilter() {
        let filteredJobs = jobList
        let jobFilter = {}
        if (location !== '')
            jobFilter.location = location
        if (employmentType !== 'any')
            jobFilter.employmentType = employmentType
        if (remoteJob !== 'any')
            jobFilter.remoteJob = remoteJob
        if (experience !== 'any')
            jobFilter.experience = experience
        if (qualification !== 'any')
            jobFilter.qualification = qualification
        if (requiredSkills.length !== 0)
            jobFilter.requiredSkills = requiredSkills
        if (currency !== 'any') {
            jobFilter.currency = currency
            if (salaryMin !== '' && salaryMin !== '0')
                jobFilter.salaryMin = salaryMin
            if (shareMin !== '' && shareMin !== '0')
                jobFilter.shareMin = shareMin
        }
        getFilteredJobs(jobFilter).then((data) => {
            props.filteredJobs(data)
        })
        // console.log(filteredJobs)
        props.filteredJobs(filteredJobs)
    }
    function locationFilter(job) {
        return job.location === location
    }
    function employmentTypeFilter(job) {
        return job.employmentType === employmentType
    }
    function remoteJobFilter(job) {
        return job.remoteJob === remoteJob
    }
    function experienceFilter(job) {
        return job.experience === experience
    }
    function qualificationFilter(job) {
        return job.qualification === qualification
    }
    
    function requiredSkillsFilter(job) {
        for (let skill of requiredSkills) {
            if(!job.requiredSkills.some(el => el._id === skill._id))
                return false
        }
        return true
    }
    function currencyFilter(job) {
        return job.currency === currency
    }
    function salaryMinFilter(job) {
        return  (job.salaryMin >= salaryMin) ||
                (job.salaryMax >= salaryMin)
    }
    function shareMinFilter(job) {
        return  (job.shareMin >= shareMin) ||
                (job.shareMax >= shareMin)
    }

    function clearFilter() {
        setLocation('')
        setEmploymentType('any')
        setRemoteJob('any')
        setExperience('any')
        setQualification('any')
        setRequiredSkills([])
        setSalaryMin('0')
        setShareMin('0')
        setCurrency('any')

        setClearInput(!clearInput)
        props.filteredJobs(jobList)
    }

    return (
        <Container>

            <SkillsTypeAhead data={setRequiredSkills} clearInput={clearInput}/>

            <hr/>

            {/*---------------- МЕСТОПОЛОЖЕНИЕ ----------------*/}

            <Form.Group className="mb-3 mt-3">
                <Form.Label>Местоположение</Form.Label>
                <Form.Control required
                              value={location}
                              onChange={e => setLocation(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                    Заполните это поле
                </Form.Control.Feedback>
            </Form.Group>

            <hr/>

            {/*---------------- УДАЛЕНКА? ----------------*/}

            <Form.Group className="mb-3">
                <Form.Label>Удаленная работа</Form.Label>
                <Form.Select aria-label="Default select example"
                             value={remoteJob}
                             onChange={e => setRemoteJob(e.target.value)}
                             required
                >
                    <option value='any'>Любой вариант</option>
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
                    <option value="any">Любой</option>
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
                    <option value="any">Любая</option>
                    <option value="Intern">Intern</option>
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                </Form.Select>
            </Form.Group>

            {/*---------------- ТИП ЗАНЯТОСТИ ----------------*/}


            <Form.Group className="mb-3">
                <Form.Label>Тип занятости</Form.Label>
                <Form.Select aria-label="Default select example"
                             value={employmentType}
                             onChange={e => setEmploymentType(e.target.value)}>
                    <option value="any">Любой</option>
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
                        <Form.Label>Зарплата от {salaryMin} {currency}</Form.Label>
                        <Form.Control value={salaryMin}
                                      onChange={e => setSalaryMin(e.target.value)}
                                      type="number"
                                      min={0}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Доля от {shareMin} %</Form.Label>
                        <Form.Control value={shareMin}
                                      onChange={e => setShareMin(e.target.value)}
                                      type="number"
                                      min={0}
                                      max={100}
                        />
                    </Form.Group>
                </Col>
            </Row>
            }


            <div className="d-flex justify-content-end">
                <Button className='btn-green' onClick={() => clearFilter()}>Очистить</Button>
                <Button className='btn-green ms-2' onClick={() => applyFilter()}>Применить</Button>

            </div>


        </Container>
    )
})

export default JobFilterPage