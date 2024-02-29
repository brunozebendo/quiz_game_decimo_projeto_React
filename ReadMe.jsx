/** Este código é da seção 12, a intenção é construir 
 * um quiz com uma barra de timer, uma pergunta e quatro
 * opções de resposta. A ideia é continuar trabalhando
 * com useEffect e useState.
 * Assim, foi adicionado um componente Header e um Quiz
*/
/**Na aula 193 foi inserida a lógica para mostrar as questões na tela
 * as questões e as respostas estão em um arquivo a parte (questions.js)
 * que aqui foi importado como QUESTIONS
 */

import { useState } from "react"
import QUESTIONS from "../questions";
/**A ideia aqui é usar menos states (sempre recomendado), então, é criado
 * um primeiro state para guardar as respostas do usuário e, com base
 * no comprimento do array (length) se tem a pergunta da vez, ou seja, 
 * se o usuário já respondeu duas perguntas, por exemplo, o comprimento
 * vai ser dois e a pergunta a ser mostrada será a 3.
 */
export default function Quiz () {
    const [userAnswers, setUserAnswers] = useState ([]);
    const activeQuestionIndex = userAnswers.length;
/**aqui é a função para lidar com a resposta escolhida, para isso
 * usa-se o padrão de guardar o array anterior e a 
 */
    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }
/**aqui o return para organizar como será mostrado na tela, o id é para
 * fins de estilização
 */
    return (
        <div id="quiz">
    <div id="question">
/**Aqui será mostrado o texto da pergunta, dentro do componente questions,
de acordo com o número da questão acima explicada, será acessado o item
text que lá está assim text: 'Which of the following definitions best describes React.js?', */        
   
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

/**já aqui, segue-se a mesma lógica, mas para acessar todas as respostas que serão 
mostradas dentro de um button e essa button já leva
a função acima. Reparar na sintaxe () => para chamar a função e não simplesmente 
chama-la diretamente, o que faria o react chama-la indevidamente. */

        <ul id="answers"> {QUESTIONS[activeQuestionIndex].answers.map((answer)=>
         (<li key={answer} className="answer">
            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
        </li>
        ))}
        </ul>
    </div>
    </div>
    );
}

/**Na aula 194 vai ser inserido o código para que as perguntas sejam misturadas
 * (sort) já que no array sempre é a primeira a correta e um if para caso o array
 * esteja zerado, quando aparecerá uma imagem e uma mensagem
 */
/**Primeiro, foi criada uma variável  que vai ser true quando a
 * questão da vez tiver o mesmo número que o comprimento do array, ou seja,
 * quando se esgotarem as perguntas
 */
const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
/**Assim, se for true, aparece a div abaixo*/

if (quizIsComplete) {
    return (<div id="sumary">
        <img src={quizCompleteImg} alt="Trophy icon"/>
        <h2>Quiz Completed!</h2>
    </div>)
}
/**Já para sortear as questões foi criada uma nova variável para guardar as
 * questões sorteadas e preservar as originais, então essa nova constante 
 * vai receber a função built in sort que normalmente recebe dois parâmetros
 * e se colocar 1, mantém a ordem, - 1, inverte a ordem, aqui foi usada também
 * a função random e o número - 0,5 para que possa dar positivo ou negativo.
 * 
 */
const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
/**Agora, esse novo array é que vai ser chamado no return */

<ul id="answers"> {shuffledAnswers.map((answer)=>
         (<li key={answer} className="answer"></li>

/**Na aula 195 vai ser criada a barra de progresso para marcar o tempo,
 * foi criado então um novo componente "QuestionTimer". Atentar que a barra tem uma
 * tag própria <progress />
 */
/*aqui a declaração padrão da função do componente, atentar que o tempo
inicial da barra (timeout) e o controle de quando o tempo acabar (onTimeOut)
foi setado como props para que possa ser definido em outro
elemento*/
</ul>
export default function QuestionTimer ( {timeout, onTimeOut}) {
    /**Aqui foi criado um controle de estado para o tempo restante,
     * sendo o timeout o tempo inicial
     */
    const [remainingTime, setRemainingTime] = useState (timeout);
 /**Aqui foi usada a função built in setTimeout que é uma função para agendar
  * algo para acontecer em determinado tempo, no caso o tempo definido
  * no prop timeout com o função chamada no onTimeOut. Aqui foi usado um useEffect
  * pois o efeito estava sendo chamado em um loop infinito e como há dois props
  * eles tem que ser passados também na dependência  */   
    useEffect (() => {
        setTimeout ( timeout, onTimeOut );
    }, [timeout, onTimeOut] )
/**aqui foi chamada a função built-in setInterval para chamar uma função
 * que vai usar o tempo restante - o tempo restante anterior - 100 milisegundos.
 * A função foi envelopada em um useEffect para que não ocorra um loop infinito, mas
 * não foi preciso passar dependência
 */
    useEffect (() => {
        setInterval (() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

    }, []);
/**abaixo a tag progress que leva dois atributos */

    return <progress id="question-time" max={timeout} value={remainingTime} />
}
/**O componente foi exportado para o componente Quiz, conforme abaixo */

<QuestionTimer timeout={10000} onTimeOut={handleSkipAnswer} />

/**após a aula o código estava funcionando, mas a função setTimeOut continuava 
 * sendo chamada pois o onTimeOut é uma função que era recriada cada vez que o 
 * tempo expirava, para acertar isso foi criada uma outra função para guardar 
 * essa função handleSelectAnswer (que é passada no props onTimeOut) dentro
 * de um callback. Lembrando q esse hook é usado para controlar quando a 
 * função será chamada. A função HandleSelectAnswer também está em um Callback
 * 
 */

const handleSkipAnswer = useCallback (() => handleSelectAnswer(null),
 [handleSelectAnswer]);

 /**e assim ela foi guardada no return */

 <QuestionTimer timeout={10000} onTimeOut={handleSkipAnswer} />

 /**Na aula 197 vai atualizar o código para acertar a barra de progresso de tempo
  * que não está finalizando junto com o aplicativo, ou seja, ela acaba e a tela
  * não muda. Para resolver isso foi chamada a função clearInterval que, como o nome
  * sugere, limpa o intervalo, para isso a funlção anterior que controla o tempo
  * foi guardada em uma variável que é passada no return e, assim, a barra é zerada
  * A mesma coisa foi feito com o timeOut, que não vou copiar aqui.
   */

 useEffect (() => {
    const interval = setInterval (() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
    }, 100);

    return () => {
       clearInterval(interval); 
    };

}, []); 

/**Mesmo após incluirmos os clears, o componente da progress bar não
 * "recarrega" e isso acontece porque o componente QuestionTimer não está sendo
 * recarregado no DOM, para resolver isso, foi acionado um método simples que é
 * adicionar uma key no componente, e dentro dessa foi passado o index que sempre
 * muda quando uma questão é selecionada. Assim, o DOM é forçado a reiniciar
 * o componente e a barra de progresso é novamente carregada.
 */

<QuestionTimer
        key = {activeQuestionIndex}
        timeout={10000}
        onTimeOut={handleSkipAnswer}
         />

/**Na aula 198 vai ser digitado o código para mudar a cor do botão quando o mouse
 * passar por cima, depois ficar vermelho se for a resposta errada ou verde se for
 * a certa. O primeiro passo é criar mais um controlador de estado, para que o usuário
 * veja se está certo ou errado, antes do componente mudar de página
  */

const [answerState, setAnswerState] = useState ("");

/**Então a função que lida com a escolha da resposta foi
 * modificada para absorver a lógica da escolha da opção correta.
 */

const handleSelectAnswer = useCallback( function handleSelectAnswer
    (selectedAnswer) {
/**aqui o estado inicial vai ser modificado para 'respondido' quando
 * o usuário selecionar uma resposta
  */
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
    });
/**aqui, após 1 segundo, o estado vai mudar para correto ou errado, a depender
 * se a resposta selecionada é igual a primeira resposta do array original de
 * respostas (QUESTIONS) pois lá é sempre a primeira resposta a correta
 */
    setTimeout(()=>{
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
            setAnswerState ('correct');
        }else{
            setAnswerState('wrong');
        }

        setTimeout(()=>{
            setAnswerState ('');
        }, 2000);
    }, 1000);
/**como a função inteira está dentro de um callback e é preciso
 * que ela seja remontada toda vez que o indice mudar, é preciso passa-lo abaixo  */
}, [activeQuestionIndex]);

/**Para que a tela não mude tão logo o usuário escolha a resposta, foi criada
 * a linha abaixo, assim, pelo que entendi, se ainda não foi dada a resposta,
 * o tamanho do array continua o mesmo, se já foi respondido, ele muda
 * automaticamente o tamanho do array, mas se mantém o mesmo por um tempo mais 
 * de dois segundos, graças ao setTimeout programado mais abaixo no código principal. 
 */

const activeQuestionIndex = answerState === '' ? userAnswers.length :userAnswers.length - 1;

setTimeout(()=>{
    setAnswerState ('');
}, 2000);



/**Agora a lógica para aplicar dinâmicamente uma cor quando o botão for selecionado
 * e depois outra cor se a opção for correta ou não. Primeiro, criou-se uma constante
 * para guardar a resposta selecionada, de acordo com o array já criado anteriormente
 * Também criou uma variável para guardar o estilo do css
 */

const isSelected = userAnswers[userAnswers.length - 1] === answer;
let cssClass = '';
/**assim, se o estado da resposta for "respondido", então o isSelected é true
 * e é aplicada a classe css abaixo, deixando o botão amarelo, conforme css
 * definido em outro componente
 */
if (answerState === 'answered' && isSelected) {
    cssClass = 'selected';
}
/**já aqui a lógica para aplicar o CSS conforme a resposta escolhida,
 * o if verifica se a resposta é correta ou errada e se foi selecionada
 * e aplica o CSS de acordo.
 */
if ((answerState === 'correct'|| answerState === 'wrong' ) && isSelected){
   cssClass = answerState; 
}
/**aqui a mudança foi a inclusão da className de acordo com a lógica que expliquei acima */
return <li key={answer} className="answer">
<button onClick={() => handleSelectAnswer(answer)} className={cssClass} >
{answer}
</button>
</li>;

/**Na aula 199, o primeiro passo é acertar um bug que faz com que
 * as perguntas sejam misturadas novamente toda vez que uma resposta é selecionada
 * e isso acontece porque o código de sort está dentro do questions e toda
 * vez que o componente é novamente renderizado, ele carragado novamente, assim,
 * como a seleção da resposta força uma nova renderização, ele mistura de novo. Para
 * resolver isso, será usado o useRef para gerenciar o valor armazenado de forma
 * independente do resto da função do componente. Assim, foi criada a variável abaixo
 * no componente Answers, e se (if) essa variável estiver indefinida (!), ou seja,
 * caso a resposta ainda não tenha sido selecionada, vai embaralhar as questões,
 * caso já tenha sido selecionada, não vai embaralhar de novo. A lógica aqui
 * é evitar o uso de um useState para controlar mais um estado.
 */

const shuffledAnswers = useRef();

if (!shuffledAnswers.current){
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
}

/**Após o acerto, as respostas não eram mais embaralhadas após a troca de tela
 * para resolver isso foi criado o componente Answers para guardar toda a 
 * lógica das respostas. Com isso, foi necessário passar vários props que vou copiar
 * abaixo para reforçar o assunto. No componente Answers:
 */

export default function Answers ({answers, selectedAnswer, answerState, onSelect})

/**No componente Quiz que antes guardava a lógica:  */

return (
    <div id="quiz">
        <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}/>

</div>

/**Reparar que foi criada uma key que é uma técnica para forçar o componente
 * a ser renderizado e para cada prop foi passado o valor correspondente que
 * ele deve guardar e levar para o componente Answers.
 */

/**Após esse acerto o componente deu outro erro, gerando várias barras de progresso
 * e isso se deu porque haviam dois componentes usando a mesma key, o que fazia
 * com que ambos fossem re-renderizados várias vezes. A solução foi criar um
 * novo componente (Question.jsx) que incorporou esses dois componentes
 * (QuestionTimer e Answers) e só o componente Question foi passado para o Quiz.
 *Vou copiar aqui o componente Question todo, já que os props do Quiz já foram
 copiados acima. No começo do componente são relacionados os props
 */
 export default function Question ({
    questionText,
    answers,
    onSelectAnswer,
    selectedAnswer,
    answerState,
    onSkipAnswer,  }){
        /**No return são passados os props de cada item com os devidos valores,
         * obervar que nesse caso o componente só está passando para a frente
         * cada prop
         */
    return (
        <div id="question">
        <QuestionTimer
        timeout={10000}
        onTimeOut={onSkipAnswer}
         />
        <h2>{questionText}</h2>
        <Answers
            answers={answers}
            selectedAnswer={selectedAnswer}
            answerState={answerState}            
            onSelect={onSelectAnswer}
            />
            

    </div>
    )    
}
/**Com essas mudanças, usou-se só uma key no return do componente Question dentro
 * do componente Quiz e não deu mais o bug ou a critíca no console do navegador
 */

/**A aula 200 vai refatorar o código para tirar a lógica de gerenciamento
 * das questões do componente Quiz e usá-lo no Question já que está se usando
 * muitos props, não vou copiar o código inteiro, pois foi basicamente
 * adaptar o código de um componente para o outro, limpando o componente QUIZ.
 * Vou destacar o que achei diferente
 */
/**o código abaixo verifica se a resposta selecionada é igual a resposta
 * de índice zero no componente question que é a resposta correta, o [index] aqui
 * vai funcionar para acessar o index da questão do momento, pelo que entendi...
 */
setTimeout (() => {
    setAnswer ({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
    })

/**Outro problema foi usar o key como props, o que deu crítica do React,
 * ele então foi substituido pelo index e no quiz ficou assim
 */

key={activeQuestionIndex}
index={activeQuestionIndex}

/**A lógica abaixo está no componente Question e ela serve para só
 * mostrar se a resposta selecionada é correta ou errada antes de mudar de tela
 * Pelo que entendi se a resposta for selecionada, ou seja, se answer.selectedAnswer
 * for true, então answer.isCorrect vai ser diferente de nulo e como ele está 
 * dentro da função handleSelectAnswer como nulo, precisará ser setado novamente.
 * Já se (else if) for respondido o estado vai mudar e será aplicado o CSS de acordo.
 */
if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
      answerState = 'answered';
  }
/**A mesma lógica foi aplicada no componente Answer para desabilitar o botão
 * caso a resposta já tenha sido selecionada
 */

return <li key={answer} className="answer">
<button
 onClick={() => onSelect(answer)}
  className={cssClass}
   disabled={answerState !== "" } >
    {answer}
    </button>
</li>

/**Na aula 201 vai ser acertado o código pois, no momento, o timer continua
 * acontecendo após a seleção da resposta e não é possível ver se a resposta
 * selecionada foi certa ou errada. Para acertar isso, será criado um novo
 * timer após a seleção do item. Assim, no componente Quention foi criada a lógica
 * abaixo para setar um tempo caso não haja a seleção da resposta e outro
 * para quando houver
 */

let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

/**Mais abaixo, no return, o timer é passado como props, pois ele será recebido no
 * componente QuestionTimer, também nesse componente foi aceito um prop de nome 
 * mode para fins de estilo.
 * Também foi acrescentada a key abaixo para, novamente, forçar a reiniciação
 * do componente e a do set interval, pois a barra mudava, mas não reiniciava
 * Também foi inserida a lógica para onTimeOut que passa a função onSkipAnswer,
 * ou seja, pula a resposta se nenhuma resposta for selecionada. Portanto, se não
 * houver seleção de resposta ele é chamado, se houver, ele é nulo
 */

return (
    <div id="question">
    <QuestionTimer
    key={timer}
    timeout={timer}
    onTimeOut={answer.selectedAnswer === '' ? onSkipAnswer : null}
    mode={answerState}
         />

</div>

/**Na aula 202 é criada a lógica para mostrar o percentual de respostas erradas,
 * certas e puladas para isso é criado o componente Summary que copio abaixo algumas partes
 */
/**Primeiro, a lógica para obter as informações de quais respostas foram puladas,
 * as nulas, conforme lógica anterior, as corretas, que correspondem as primeiras
 * do array, então é feito o percentual de cada uma dividindo o número do tipo
 * de resposta, pelas respostas totais e multiplicando por cem, com excenção
 * das erradas que é o que sobra. Essas variáveis são {setadas} dinâmicamente mais
 * abaixo
 */

export default function Summary ({userAnswers }) {
    const skippedAnswers = userAnswers.filter(answer => answer === null );
    const correctAnswers = userAnswers.filter(
       ( answer, index) => answer === QUESTIONS[index].answers[0] );

    const skippedAnswersShare = Math.round (
        (skippedAnswers.length / userAnswers.length) * 100);

    const correctAnswersShare = Math.round (
        (correctAnswers.length / userAnswers.length) *100
        );
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

    /**Mais abaixo é chamada uma ordered list para aplicar dinâmicamente uma
     * cssClass
     */
    <ol>
    {userAnswers.map((answer, index) => {
        let cssClass = 'user-answer';

        if (answer === null) {
            cssClass += ' skipped';
        } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
        } else {
            cssClass += ' wrong';
        }

        /**Aqui é a lógica para mostrar um número (baseado no index criado
         * automaticamente pelo React) + 1, pois começa em zero, depois
         * a pergunta de cada tela e a resposta dada ou Skipped caso tenha sido pulada */
        return( 
    <li key={answer}>
        <h3>{index + 1}</h3>
        <p className='question'>{QUESTIONS[index].text}</p>
        <p className={cssClass}>{answer ?? 'Skipped'}</p>
    </li>
        );
    })}

    </ol>

    /**No componente Quiz, o componente ficou assim, passando como props
     * apenas as respostas do usuário.
     */

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }