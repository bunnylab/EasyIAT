from EasyIAT import ma
from EasyIAT.models import Experiment, Block

class ExperimentSchema(ma.ModelSchema):
    class Meta:
        model = Experiment

class BlockSchema(ma.ModelSchema):
    class Meta:
        model = Block

experiment_schema = ExperimentSchema()
experiments_schema = ExperimentSchema(many=True)
block_schema = BlockSchema()
blocks_schema = BlockSchema(many=True)