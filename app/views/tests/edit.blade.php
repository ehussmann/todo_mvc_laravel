@extends('layouts.scaffold')

@section('main')

<h1>Edit Test</h1>
{{ Form::model($test, array('method' => 'PATCH', 'route' => array('tests.update', $test->id))) }}
	<ul>
        <li>
            {{ Form::label('test', 'Test:') }}
            {{ Form::text('test') }}
        </li>

		<li>
			{{ Form::submit('Update', array('class' => 'btn btn-info')) }}
			{{ link_to_route('tests.show', 'Cancel', $test->id, array('class' => 'btn')) }}
		</li>
	</ul>
{{ Form::close() }}

@if ($errors->any())
	<ul>
		{{ implode('', $errors->all('<li class="error">:message</li>')) }}
	</ul>
@endif

@stop
