import {I3Result} from '../../src/i3/externs/result';
import i3GetSocketPath from '../../src/i3/get-socket-path';
import I3Communicator from '../../src/i3/communicator';
import {expect} from 'chai';

describe('i3-communicator', () => {
	var subject: I3Communicator;

	beforeEach('create new instance', () => {
		subject = new I3Communicator();
	});

	describe('#connect', () => {
		it('should connect to existing i3-socket', (done) => {
			subject.connect(i3GetSocketPath()).then(() => {
				done();
			});
		});

		it('should fail on connection', (done) => {
			subject.connect('/dev/null').then(() => {}, () => done());
		});
	});

	describe('#command', () => {

		beforeEach((done) => {
			subject.connect(i3GetSocketPath()).then(() => done());
		});

		it('should have two results on two commands', (done) => {
			subject.command('exec echo; exec echo')
				.then((results: I3Result[]) => {
					if (results.length === 2) {
						done();
					}
				});
		});

		it('should have success field equal to true', () => {
			subject.command('exec echo')
				.then((results: I3Result[]) => {
					expect(results[0].success).to.equal(true);
				});
		});

		it('should have error field', () => {
			subject.command('fail')
				.then((results: I3Result[]) => {
					expect(results[0])
						.to.have.property('error');
				});
		});
	});
});
