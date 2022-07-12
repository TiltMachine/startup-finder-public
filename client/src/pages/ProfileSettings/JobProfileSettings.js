import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {saveProfileSettingsChanges, uploadImg, uploadPdf} from "../../http/userAPI";
import {Typeahead} from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {getAllSkills} from "../../http/skillAPI";
import {observer} from "mobx-react-lite";

const JobProfileSettings = observer((userData) => {
    const {userStorage} = useContext(Context)
    const [newSkills, setNewSkills] = useState([])
    const [githubLink, setGithubLink] = useState(userData.user.githubLink || '')
    const [desiredSalary, setDesiredSalary] = useState(userData.user.desiredSalary || '')
    const [desiredCurrency, setDesiredCurrency] = useState(userData.user.desiredCurrency || '₽')
    const [experienceYears, setExperienceYears] = useState(userData.user.experienceYears || '')
    // Выборка скилов в дропнауне
    // const [options, setOptions] = useState([])
    const [options] = useState([])
    // Объект Skill
    // const [skillObjects, setSkillObjects] = useState({})
    const [skillObjects] = useState({})
    // Проверка загрузки скиллов юзера
    const [isUserSkillsLoaded, setIsUserSkillsLoaded] = useState(false)
    const [selectedFile, setSelectedFile] = useState(userData.user.resumeCV || null)

    useEffect(()=>{
        getAllSkills().then(data => {
            data.forEach(skill => {
                skillObjects[skill.name] = skill
                options.push(skill.name)
            })
            // data.map(skill => {
            //     skillObjects[skill.name] = skill
            //     options.push(skill.name)
            // })
        })

        for (let skill of userStorage.user.skills) {
            newSkills.push(skill.name)
        }
        // console.log(newSkills)
        setIsUserSkillsLoaded(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const handleSaveChanges = () => {

        if(selectedFile){
            const fileData = new FormData()
            fileData.append('cv', selectedFile)
            uploadPdf(fileData).then( data =>{
                console.log(data)
            })
        }

        let newSkillObjects = []
        newSkills.forEach(skillName => newSkillObjects.push(skillObjects[skillName]))
        console.log(newSkillObjects)
        saveProfileSettingsChanges(userStorage.user, {
            skills: newSkillObjects,
            githubLink: githubLink,
            desiredSalary: desiredSalary,
            desiredCurrency: desiredCurrency,
            experienceYears: experienceYears
        }).then(data => {
                userStorage.updateUserStorage = Date.now()
            })
    }

    return (
        <Container>
            { isUserSkillsLoaded &&
                <Form>
                    <h5>Специализация</h5>
                    <hr/>
                    {selectedFile &&
                        <div>
                            <div className=' block_title cursor_pointer link_resumeCV' onClick={() => {
                                window.open(process.env.REACT_APP_API_URL + selectedFile)
                            }}>Ваше резюме</div>
                            <hr/>
                        </div>
                    }


                    <Form.Group as={Row} controlId="formFileLg" className="mb-3">
                        <Form.Label column sm={2}>Резюме</Form.Label>
                        <Col sm={5}>
                            <Form.Control type="file" size="sm" onChange={e=> setSelectedFile(e.target.files[0])} />
                            <div style={{fontSize: '14px'}} className='mt-1'>Поддерживаемый формат: pdf.</div>
                        </Col>
                    </Form.Group>
                    <hr/>

                    {/*---------------------GITHUB LINK---------------------*/}

                    <Form.Group className="mt-2">
                        <Form.Label>Ссылка на github</Form.Label>
                        <Form.Control
                                      value={githubLink}
                                      onChange={e => setGithubLink(e.target.value)}/>
                    </Form.Group>

                    {/*---------------------EXP YEARS---------------------*/}

                    <Form.Group as={Col} className="mt-2">
                        <Form.Label>Опыт (лет)</Form.Label>
                        <Form.Control
                            value={experienceYears}
                            onChange={e => setExperienceYears(e.target.value)}
                            type="number"
                            min={0}
                        />
                    </Form.Group>

                    {/*---------------------DESIRED SALARY AND CURRENCY---------------------*/}
                    <Row>
                        <Form.Group as={Col} className="mt-2">
                            <Form.Label>Желаемая зарплата</Form.Label>
                            <Form.Control
                                value={desiredSalary}
                                onChange={e => setDesiredSalary(e.target.value)}
                                type="number"
                                min={0}
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mt-2">
                            <Form.Label>Валюта</Form.Label>
                            <Form.Select aria-label="Default select example"
                                         value={desiredCurrency}
                                         onChange={e => setDesiredCurrency(e.target.value)}>
                                <option value="₽">Рубль (₽)</option>
                                <option value="$">Доллар ($)</option>
                                <option value="€">Евро (€)</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    {/*---------------------SKILLS---------------------*/}

                    <Form.Group style={{marginTop: '10px'}}>
                        <Form.Label>Технологии</Form.Label>
                        <Typeahead
                            id="basic-typeahead-multiple"
                            labelKey="skill_names"
                            multiple
                            onChange={setNewSkills}
                            options={options}
                            placeholder="Choose several technologies"
                            selected={newSkills}
                        />
                    </Form.Group>



                    {/*---------------------SAVE BUTTON---------------------*/}

                    <Row>
                        <Col>
                            <Button className='btn-green mt-4' onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </Col>
                    </Row>

                </Form>
            }
        </Container>
    );
})

export default JobProfileSettings;