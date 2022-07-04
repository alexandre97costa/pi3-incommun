import React, { useEffect, useState } from 'react'


export default function RedeSocial(props) {

    const id = parseInt(props.pergunta.id)
    const [selected, setSelected] = useState(!!props.perguntasObject[id]?.inteiro)
    const [posts, setPosts] = useState(0)
    const [stories, setStories] = useState(0)
    const [reels, setReels] = useState(0)


    // useEffect(() => {
    //     if (props.perguntasObject.hasOwnProperty(id)
    //         && props.perguntasObject[id] !== undefined
    //         && selected) {
    //         props.setResposta(props.pergunta.titulo)
    //     }
    // }, [props.perguntaObject])

    useEffect(() => {
        let colapse = document.getElementById('r-social-' + props.pergunta.id)
        colapse.addEventListener('show.bs.collapse', e => { setSelected(true) })
        colapse.addEventListener('hidden.bs.collapse', e => { setSelected(false) })



    }, [])

    useEffect(() => {
        console.log('selected', selected)
    }, [selected])

    useEffect(() => {
        if (
            selected &&
            (!!posts || !!stories || !!reels)
        ) {
            const updateObj = {}
            const updateResposta = {
                texto: posts + ' posts, ' + stories + ' stories, ' + reels + ' reels.',
                inteiro: +posts + +stories + +reels
            }
            updateObj[id] = updateResposta;

            console.log(updateObj)

            props.setPerguntasObject({
                ...props.perguntasObject,
                ...updateObj
            })
        }

    }, [posts, stories, reels])


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

        const [count, setCount] = useState(0)

        useEffect(() => { setCount(props?.posts ?? props?.stories ?? props?.reels) }, [])


        return (
            <div className='mt-3'>
                <span className='fw-semibold'>{props.tipo + ' por semana:'}</span>
                <div className='btn-group w-100 mt-2 shadow' role='group' aria-label='Basic example'>
                    <button type='button' onClick={e => { handleClickNumber(e, props.tipo, 1); }} className={(count === 1 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>1</button>
                    <button type='button' onClick={e => { handleClickNumber(e, props.tipo, 3); }} className={(count === 3 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>3</button>
                    <button type='button' onClick={e => { handleClickNumber(e, props.tipo, 5); }} className={(count === 5 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>5</button>
                    <button type='button' onClick={e => { handleClickNumber(e, props.tipo, 7); }} className={(count === 7 ? 'btn-warning fw-bold' : 'btn-outline-warning border') + ' btn btn-sm text-dark'}>5+</button>
                </div>
            </div>
        )
    }

    return (
        <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 pb-4'>
            <div className={(selected ? 'border border-3 border-warning' : 'border border-1') + '  rounded-4 bg-white shadow position-relative d-flex flex-column justify-content-center align-items-center'}>
                <button
                    type='button'
                    className='btn border-0 rounded-4 w-100 p-3 '
                    data-bs-toggle='collapse'
                    data-bs-target={'#r-social-' + props.pergunta.id}
                    data-titulo={props.pergunta.titulo}
                >

                    <div className={(selected ? 'text-indigo' : 'text-light-dark') + ' display-3 mb-3'}>
                        <i className={'bi ' + props.pergunta.descricao}></i>
                    </div>
                    <div className={(selected ? 'text-indigo fw-semibold' : 'text-secondary') + ' fs-5'}>
                        {props.pergunta.titulo}
                    </div>
                </button>

                <div className={(selected && 'show') + ' collapse px-3 pb-4 border-top border-1 text-start w-100 teste'} id={'r-social-' + props.pergunta.id}>
                    <PickANumber tipo='Posts' posts={posts} />
                    {props.pergunta.tipo_pergunta.titulo.includes('stories') &&
                        <PickANumber tipo='Stories' stories={stories} />
                    }
                    {props.pergunta.tipo_pergunta.titulo.includes('reels') &&
                        <PickANumber tipo='Reels' reels={reels} />
                    }
                </div>

                {selected &&
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning fs-3 p-0'>
                        <i className='bi bi-check'></i>
                        <span className='visually-hidden'>unread messages</span>
                    </span>
                }
            </div>
        </div>
    )

}