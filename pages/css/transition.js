import { Button, Card, Divider, Select, Slider } from "antd";
import ContentLayout from "../../components/contentlayout/ContentLayout";
import { useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { useCopy } from "../../lib/useCopy";
import ColorPicker from "../../components/colorPicker/ColorPicker";
import timingFunction from "../../data/timingFunction";

const Translate = () => {
  const [state, setState] = useState({
    type: 'opacity',
    duration: 0.3,
    delay: 0,
    timeFun: 'ease',
  });
  const [start, setStart] = useState('100');
  const [startEnd, setStartEnd] = useState(null);
  const [copy, setCopy] = useCopy();
  const ref = useRef();

  useEffect(() => {
    if (state.type === 'opacity') {
      setStartEnd(<Opacity start={start} setStart={setStart} />);
    } else if (state.type === 'background') {
      setStartEnd(<Background start={start} setStart={setStart} />)
    } else if (state.type === 'outline') {
      setStartEnd(<Outline {...state} setState={setState} />)
    } else if (state.type === 'height') {
      setStartEnd(<Height {...state} setState={setState} />)
    } else if (state.type === 'width') {
      setStartEnd(<Width {...state} setState={setState} />)
    }
  }, [state.type]);
  console.log('parent', start);
  return (<section>
    <ContentLayout name='Transition' back="/css" >
      <ContentLayout.Paragraph>
        <p>
          {`The transition CSS property is a shorthand property for transition-property, transition-duration, transition-timing-function, and transition-delay.`}
        </p>
      </ContentLayout.Paragraph>
      <ContentLayout.Options>
        <div>
          <p className="content_title">Option</p>
          <Card>
            <label htmlFor="type">Type</label>
            <Select id="type" style={{ width: '100%' }} value={state.type} onChange={e => setState(p => ({ ...p, type: e }))}>
              <Select.Option value='opacity'>opacity</Select.Option>
              <Select.Option value='background'>background-color</Select.Option>
              <Select.Option value='outline'>outline</Select.Option>
              <Select.Option value='height'>height</Select.Option>
              <Select.Option value='width'>width</Select.Option>
            </Select>
            <Divider dashed />
            {startEnd !== null && startEnd}
            <Divider dashed />
            <label htmlFor="duration">Duration ({state.duration}s)</label>
            <Slider id="duration" step={0.1} max={5} value={state.duration} onChange={e => setState(p => ({ ...p, duration: e }))} />
            <Divider dashed />
            <label htmlFor="function">Timing Function</label>
            <Select
              id="function"
              style={{ width: '100%' }}
              value={state.timeFun}
              onChange={e => setState(p => ({ ...p, timeFun: e }))}
              options={timingFunction}
            />
            <Divider dashed />
            <label htmlFor="delay">Delay ({state.delay}s)</label>
            <Slider id="delay" step={0.1} max={5} value={state.delay} onChange={e => setState(p => ({ ...p, delay: e }))} />
          </Card>
        </div>
      </ContentLayout.Options>
      <ContentLayout.Preview>
        <div>
          <p className="content_title">Preview</p>
          <Card>
            <div
              align='middle'
              style={{
                minHeight: 200,
              }}
            >
              <div style={{
                width: 200,
                background: '#a0a0a0',
                textAlign: 'center',
                // transform: `translate(${x}px, ${y}px)`,
              }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos natus sed vel error distinctio nemo explicabo perferendis, voluptates ipsa consequatur deleniti debitis. Itaque vitae expedita consequuntur recusandae delectus, voluptatum id.
              </div>
            </div>
          </Card>
        </div>
        <div>
          <p className="content_title">Code</p>
          <Card>
            <div className="justify-between items-center">
              <code ref={ref}>
                {/* transform: {`translate(${x}px, ${y})px`}; */}
              </code>
              <Button onClick={() => setCopy(ref)} icon={<FaCopy />} />
            </div>
          </Card>
        </div>
      </ContentLayout.Preview>
    </ContentLayout>
  </section>);
}


const Opacity = ({ start, setStart }) => {

  return (<>
    <h1>Opacity</h1>
  </>)
};

const Background = ({ start, setStart }) => {
  useEffect(() => {
    setStart('#ffff');
  }, []);
  console.log('child', start);
  return (<>
    <h1>Back</h1>
  </>)
};

const Outline = () => {
  return (<>
    <h1>Outline</h1>
  </>)
};

const Height = () => {
  return (<>
    <h1>Height</h1>
  </>)
};

const Width = () => {
  return (<>
    <h1>Width</h1>
  </>)
};

export default Translate;