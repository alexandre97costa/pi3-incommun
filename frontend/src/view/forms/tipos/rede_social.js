import React, { useEffect, useState } from 'react'


export default function RedeSocial(props) {

    const id = parseInt(props.pergunta.id)
    const [posts, setPosts] = useState(props.perguntasObject[id]?.texto[0])
    const [stories, setStories] = useState(props.perguntasObject[id]?.texto[1])
    const [reels, setReels] = useState(props.perguntasObject[id]?.texto[2])
    const [selected, setSelected] = useState(-1)


    // useEffect(() => {
    //     if (props.perguntasObject.hasOwnProperty(id)
    //         && props.perguntasObject[id] !== undefined
    //         && selected) {
    //         props.setResposta(props.pergunta.titulo)
    //     }
    // }, [props.perguntaObject])

    useEffect(() => {
        let colapse = document.getElementById('r-social-' + props.pergunta.id)
        colapse.addEventListener('shown.bs.collapse', e => {
            let titulo = props.pergunta.tipo_pergunta.titulo;

            (titulo.includes('posts')) ? setPosts(3) : setPosts(0);
            (titulo.includes('stories')) ? setStories(3) : setStories(0);
            (titulo.includes('reels')) ? setReels(3) : setReels(0);

        })
        colapse.addEventListener('hidden.bs.collapse', e => { setPosts(0); setStories(0); setReels(0); })
    }, [])

    useEffect(() => {
        if (selected > -1) {
            const updateObj = {}
            const updateResposta = {
                texto: [posts, stories, reels],
                inteiro: +posts + +stories + +reels
            }
            updateObj[id] = updateResposta;

            if (!(JSON.stringify(updateObj[id]?.texto) === JSON.stringify(props.perguntasObject[id]?.texto))) {
                props.setPerguntasObject({
                    ...props.perguntasObject,
                    ...updateObj
                })
            }
        }
    }, [selected])

    useEffect(() => { if (!isNaN(posts) ) { setSelected(posts + stories + reels) } }, [posts])
    useEffect(() => { if (!isNaN(stories) ) { setSelected(posts + stories + reels) } }, [stories])
    useEffect(() => { if (!isNaN(reels) ) { setSelected(posts + stories + reels) } }, [reels])


    function handleClickNumber(e, tipo, n) {

        setTimeout(() => {
            e.target.blur()
        }, 100);

        let number = parseInt(n)

        switch (tipo) {
            case 'Posts': (number !== posts) && setPosts(number); break;
            case 'Stories': (number !== stories) && setStories(number); break;
            case 'Reels': (number !== reels) && setReels(number); break;
            default: console.log('algo de errado no handleClickNumber'); break;
        }

        
    }

    function PickANumber(props) {
        return (
            <div className='mt-3'>
                <span className='fw-semibold'>{props.tipo + ' por semana:'}</span>
                <div className='btn-group w-100 mt-2 shadow' role='group' aria-label='Basic example'>
                    <button type='button' onClick={e => { props.setCount(1); }} className={(props.count === 1 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>1</button>
                    <button type='button' onClick={e => { props.setCount(3); }} className={(props.count === 3 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>3</button>
                    <button type='button' onClick={e => { props.setCount(5); }} className={(props.count === 5 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>5</button>
                    <button type='button' onClick={e => { props.setCount(7); }} className={(props.count === 7 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>5+</button>
                </div>
            </div>
        )
    }

    return (
        <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 pb-4'>
            <div className={(selected > 0 ? 'border border-3 border-warning' : 'border border-1') + '  rounded-4 bg-white shadow position-relative d-flex flex-column justify-content-center align-items-center'}>
                <button
                    type='button'
                    className='btn border-0 rounded-4 w-100 p-3 '
                    data-bs-toggle='collapse'
                    data-bs-target={'#r-social-' + props.pergunta.id}
                    data-titulo={props.pergunta.titulo}
                >

                    <div className={(selected > 0 ? 'text-indigo' : 'text-light-dark') + ' display-3 mb-3'}>
                        <i className={'bi ' + props.pergunta.descricao}></i>
                    </div>
                    <div className={(selected > 0 ? 'text-indigo fw-semibold' : 'text-secondary') + ' fs-5'}>
                        {props.pergunta.titulo}
                    </div>
                </button>

                <div className={(selected > 0 && 'show') + ' collapse px-3 pb-4 border-top border-1 text-start w-100 teste'} id={'r-social-' + props.pergunta.id}>
                    <PickANumber tipo='Posts' count={posts} setCount={setPosts} />
                    {props.pergunta.tipo_pergunta.titulo.includes('stories') &&
                        <PickANumber tipo='Stories' count={stories} setCount={setStories} />
                    }
                    {props.pergunta.tipo_pergunta.titulo.includes('reels') &&
                        <PickANumber tipo='Reels' count={reels} setCount={setReels} />
                    }
                </div>

                {selected > 0 &&
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning fs-3 p-0'>
                        <i className='bi bi-check'></i>
                        <span className='visually-hidden'>unread messages</span>
                    </span>
                }
            </div>
        </div>
    )

}