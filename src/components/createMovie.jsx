import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addActor, addProducer, createMovie } from '../store/action/movieActions';
import '../css/Movie.css'
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../global';

const CreateMovie = ({ token }) => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('')
    const [actors, setActors] = useState('')
    const [producer, setProducer] = useState('')
    const navigate = useNavigate()
    const error = useSelector(state => state.movie.error);
    const message = useSelector((state) => state.movie.message)

    const formik = useFormik({
        initialValues: {
            movieName: '',
            yearOfRelease: '',
            plot: '',
            poster: '',
            producer: '',
            actors: []
        },
        validationSchema: Yup.object({
            movieName: Yup.string().required('Movie Name is Required'),
            yearOfRelease: Yup.number().required('Year is Required'),
            plot: Yup.string().required('Plot is Required'),
            poster: Yup.string().required('Poster is Required and give link for poster'),
            producer: Yup.string().required('Producer Name is Required'),
            actors: Yup.string().required('Actor Name is Required')
        }),
        onSubmit: async (values) => {
            try {
                const actorsString = values.actors.split(',');
                const newValues = { ...values, actors: actorsString };
                await dispatch(createMovie(newValues));
                formik.resetForm();
                if (message) {
                    alert('Movie Added Successfully')
                    navigate('/movieList')
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        },
    });

    async function fetchProducer() {
        try {
            const response = await fetch(`${API}/producer/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });
            const data = await response.json();
            console.log(data);
            setProducer(data.producer);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchActors() {
        try {
            const response = await fetch(`${API}/actor/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
            });
            const data = await response.json();
            console.log(data);
            setActors(data.actors);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProducer();
        fetchActors();
    }, []);

    return (
        <div className='m-5'>
            <h2 className='text-center text-light container' style={{ paddingTop: "50px" }}>Create New Movie Page</h2>
            <div className='text-center'><Link className='text-light' style={{ fontSize: "larger" }} to={'/movieList'}>Movie List</Link></div>
            <h5 className='text-center text-light container p-4'>You can type Producer name and Actor name are available in the list,
                If not available kindly add producer details and actors details below this page then you can able to add a new movie</h5>
            <div className='top-create-page'>
                <div className='text-light p-2'>
                    <h5>Producer List</h5>
                    {producer && producer.map((item) => (
                        <div key={item._id}> <p>{item.producerName}</p> </div>
                    ))}
                </div>
                <div className='bg-white container-create-movie mx-auto'>
                    <h2 className='text-center container'>Create New Movie Form</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="moviename" className="form-label">Movie Name</label>
                        <input type="text"
                            placeholder="Enter Movie Name"
                            className="form-control"
                            id="moviename"
                            title="Enter Movie Name" {...formik.getFieldProps('movieName')} />
                        {formik.touched.movieName && formik.errors.movieName ? <div className='text-danger'>*{formik.errors.movieName}</div> : null}
                        <label htmlFor="year" className="form-label">Year Of Release</label>
                        <input type="text"
                            placeholder="Enter year as yyyy"
                            className="form-control"
                            id="year"
                            title="Enter year as yyyy" {...formik.getFieldProps('yearOfRelease')} />
                        {formik.touched.yearOfRelease && formik.errors.yearOfRelease ? <div className='text-danger'>*{formik.errors.yearOfRelease}</div> : null}
                        <label htmlFor="plot" className="form-label">Plot</label>
                        <input type="text"
                            placeholder="Enter story line of the movie"
                            className="form-control"
                            id="plot"
                            title="Enter story line of the movie" {...formik.getFieldProps('plot')} />
                        {formik.touched.plot && formik.errors.plot ? <div className='text-danger'>*{formik.errors.plot}</div> : null}
                        <label htmlFor="poster" className="form-label">Poster</label>
                        <input type="text"
                            placeholder="Add a link for Poster"
                            className="form-control"
                            id="poster"
                            title="Add a link for Poster" {...formik.getFieldProps('poster')} />
                        {formik.touched.poster && formik.errors.poster ? <div className='text-danger'>*{formik.errors.poster}</div> : null}
                        <label htmlFor="producer" className="form-label">Producer Name</label>
                        <input type="text"
                            placeholder="Enter Producer Name"
                            className="form-control"
                            id="producer"
                            title="Enter Producer Name" {...formik.getFieldProps('producer')} />
                        {formik.touched.producer && formik.errors.producer ? <div className='text-danger'>*{formik.errors.producer}</div> : null}
                        <label htmlFor="actor" className="form-label">Actors Name</label>
                        <input type="text"
                            placeholder="Enter Actors Name separated by comma"
                            className="form-control"
                            id="actor"
                            title="Enter Actors Name separated by comma(eg:Ajith,Vijay,Suriya)" {...formik.getFieldProps('actors')} />
                        {formik.touched.actors && formik.errors.actors ? <div className='text-danger'>*{formik.errors.actors}</div> : null}
                        <button type="submit" className="btn btn-warning mt-3">Create Movie</button>
                        {error && <div className='text-danger text-center p-2'>{JSON.stringify(error)}</div>}
                        {errorMessage && <div className='text-danger text-center'>{JSON.stringify(errorMessage)}</div>}
                    </form>
                </div>
                <div className='text-light p-2'>
                    <h5>Actors List</h5>
                    <div>
                        {actors && actors.map((item) => (
                            <div key={item._id}> <p>{item.actorName}</p> </div>
                        ))}
                    </div>
                </div>
            </div>
            <h2 className='text-center text-light container p-4'>Add Producer And Actors Details</h2>
            <AddProducer fetchProducer={fetchProducer} />
            <AddActor fetchActors={fetchActors} />
        </div>
    );
};

export default CreateMovie;

// Producer Form
function AddProducer({ fetchProducer }) {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('')
    const error = useSelector(state => state.movie.error);
    const message = useSelector((state) => state.movie.message)

    const formik = useFormik({
        initialValues: {
            producerName: '',
            producerGender: '',
            producerDob: '',
            producerBio: ''
        },
        validationSchema: Yup.object({
            producerName: Yup.string().required('Producer Name is Required'),
            producerGender: Yup.string().required('Producer Gender is Required'),
            producerDob: Yup.date().required('Producer DOB is Required').nullable().transform((value, originalValue) => {
                if (originalValue) {
                    const [year, month, day] = originalValue.split('-');
                    return new Date(year, month - 1, day);
                }
                return null;
            }).typeError('Please enter a valid date in the format yyyy-mm-dd'),
            producerBio: Yup.string().required('Producer Bio is Required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(addProducer(values));
                formik.resetForm();
                fetchProducer();
                window.scrollTo(0, 0); // Scroll to the top of the page
                if (message) {
                    alert("Producer added successfully")
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        },
    });

    return (
        <div className='m-5'>
            <div className='bg-white container-producer mx-auto'>
                <h2 className='text-center container'>Add Producer Form</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="producername" className="form-label">Producer Name</label>
                    <input type="text"
                        placeholder="Enter Producer Name"
                        className="form-control"
                        id="producername"
                        title="Enter Movie Name" {...formik.getFieldProps('producerName')} />
                    {formik.touched.producerName && formik.errors.producerName ? <div className='text-danger'>*{formik.errors.producerName}</div> : null}
                    <label htmlFor="producergender" className="form-label">Producer Gender</label>
                    <input type="text"
                        placeholder="Enter Producer Name"
                        className="form-control"
                        id="producergender"
                        title="Enter Gender Male or Female or Other" {...formik.getFieldProps('producerGender')} />
                    {formik.touched.producerGender && formik.errors.producerGender ? <div className='text-danger'>*{formik.errors.producerGender}</div> : null}
                    <label htmlFor="producerdob" className="form-label">Producer DOB</label>
                    <input type="text"
                        placeholder="Enter Producer DOB"
                        className="form-control"
                        id="producerdob"
                        title="Enter DOB as yyyy-mm-dd" {...formik.getFieldProps('producerDob')} />
                    {formik.touched.producerDob && formik.errors.producerDob ? <div className='text-danger'>*{formik.errors.producerDob}</div> : null}
                    <label htmlFor="producerbio" className="form-label">Producer Bio</label>
                    <input type="text"
                        placeholder="Enter Producer Bio"
                        className="form-control"
                        id="producerbio"
                        title="Enter Producer Bio" {...formik.getFieldProps('producerBio')} />
                    {formik.touched.producerBio && formik.errors.producerBio ? <div className='text-danger'>*{formik.errors.producerBio}</div> : null}
                    <button type="submit" className="btn btn-warning mt-3">Add Producer</button>
                    {error && <div className='text-danger text-center p-2'>{JSON.stringify(error)}</div>}
                    {errorMessage && <div className='text-danger text-center'>{JSON.stringify(errorMessage)}</div>}
                </form>
            </div>
        </div>
    )
}

//Actor Form
function AddActor({ fetchActors }) {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('')
    const error = useSelector(state => state.movie.error);
    const message = useSelector((state) => state.movie.message)

    const formik = useFormik({
        initialValues: {
            actorName: '',
            actorGender: '',
            actorDob: '',
            actorBio: ''
        },
        validationSchema: Yup.object({
            actorName: Yup.string().required('Actor Name is Required'),
            actorGender: Yup.string().required('Actor Gender is Required'),
            actorDob: Yup.date().required('Actor DOB is Required').nullable().transform((value, originalValue) => {
                if (originalValue) {
                    const [year, month, day] = originalValue.split('-');
                    return new Date(year, month - 1, day);
                }
                return null;
            }).typeError('Please enter a valid date in the format yyyy-mm-dd'),
            actorBio: Yup.string().required('Actor Bio is Required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(addActor(values));
                formik.resetForm();
                fetchActors();
                window.scrollTo(0, 0); // Scroll to the top of the page
                if (message) {
                    alert("Actor added successfully")
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        },
    });

    return (
        <div className='m-5'>
            <div className='bg-white container-actor mx-auto'>
                <h2 className='text-center container'>Add Actor Form</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="actorname" className="form-label">Actor Name</label>
                    <input type="text"
                        placeholder="Enter Actor Name"
                        className="form-control"
                        id="actorname"
                        title="Enter Actor Name" {...formik.getFieldProps('actorName')} />
                    {formik.touched.actorName && formik.errors.actorName ? <div className='text-danger'>*{formik.errors.actorName}</div> : null}
                    <label htmlFor="actorgender" className="form-label">Actor Gender</label>
                    <input type="text"
                        placeholder="Enter Actor Gender"
                        className="form-control"
                        id="actorgender"
                        title="Enter Gender Male or Female or Other" {...formik.getFieldProps('actorGender')} />
                    {formik.touched.actorGender && formik.errors.actorGender ? <div className='text-danger'>*{formik.errors.actorGender}</div> : null}
                    <label htmlFor="actordob" className="form-label">Actor DOB</label>
                    <input type="text"
                        placeholder="Enter Actor DOB"
                        className="form-control"
                        id="actordob"
                        title="Enter DOB as yyyy-mm-dd" {...formik.getFieldProps('actorDob')} />
                    {formik.touched.actorDob && formik.errors.actorDob ? <div className='text-danger'>*{formik.errors.actorDob}</div> : null}
                    <label htmlFor="actorbio" className="form-label">Actor Bio</label>
                    <input type="text"
                        placeholder="Enter Actor Bio"
                        className="form-control"
                        id="actorbio"
                        title="Enter Actor Bio" {...formik.getFieldProps('actorBio')} />
                    {formik.touched.actorBio && formik.errors.actorBio ? <div className='text-danger'>*{formik.errors.actorBio}</div> : null}
                    <button type="submit" className="btn btn-warning mt-3">Add Actor</button>
                    {error && <div className='text-danger text-center p-2'>{JSON.stringify(error)}</div>}
                    {errorMessage && <div className='text-danger text-center'>{JSON.stringify(errorMessage)}</div>}
                </form>
            </div>
        </div>
    )
}